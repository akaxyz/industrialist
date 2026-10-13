export class Node {
  constructor(data) {
    this.id = data.id;
    this.max = data.maxBuffer ?? 0;
    this.transferRate = data.transferRate ?? 0;
    this.amount = data.amount ?? 0;
    this.connections = data.connections ?? [];
    this.flow = data.flow ?? 0;
  }

  hasAmount(amount) {
    return this.amount - amount >= 0;
  }

  isFull() {
    return this.amount >= this.max;
  }

  getBuffer() {
    return this.amount;
  }

  getMax() {
    return this.max;
  }

  getFlow() {
    return this.flow || 0;
  }

  setMax(max) {
    this.max = max || 0;
  }

  setFlow(flow) {
    this.flow = flow || 0;
  }
}

export class Pipe extends Node {
  constructor(data) {
    super(data);

    this.item = data.item ?? "";
    this.temp = data.temp ?? 18;
    this.runTemp = data.runTemp ?? 18;
  }

  newHeat(oldAmount, oldTemp, addedAmount, addedTemp) {
    const newAmount = oldAmount + addedAmount;

    if (newAmount === 0) {
      return addedTemp;
    }

    return (
      0.01 *
      Math.floor(
        ((oldAmount * oldTemp + addedAmount * addedTemp) / newAmount) * 100 +
          0.5,
      )
    );
  }

  heatDilute(targetTemp, multiplier = 5) {
    return (
      (multiplier * (this.temp - targetTemp)) / (7200 * (this.amount + 0.01))
    );
  }

  heatDiluteOptimized(targetTemp, heatDiffuseModifier = 100, multiplier = 5) {
    return -multiplier * (
      (((targetTemp - this.temp) * (100 / (heatDiffuseModifier || 100))) /
        (7200 * (this.amount + 0.01)))
    );
  }

  setUsedTemperature(temp) {
    this.runTemp = temp;
  }

  setTemp(temp) {
    this.temp = temp;
  }

  diffuseTemp(targetTemp = 21, multiplier = 1) {
    return this.heatDilute(targetTemp, multiplier);
  }

  addItem(amount, itemName) {
    if (this.amount === 0) {
      this.item = itemName;
    } else if (itemName !== this.item) {
      return -1;
    }

    const prevAmount = this.amount;
    const prevTemp = this.temp;

    let newAmount = this.amount + amount;

    if (this.max <= newAmount) {
      newAmount = this.max;
    }

    this.amount = newAmount;
    this.temp = this.newHeat(
      prevAmount,
      prevTemp,
      newAmount - prevAmount,
      this.runTemp,
    );

    return newAmount;
  }

  addItemAmount(itemName, amount) {
    return this.addItem(amount, itemName);
  }

  setItem(buffer, itemName) {
    this.amount = buffer;
    this.item = itemName;
    this.temp = this.runTemp;
  }

  remove(amount) {
    const newAmount = this.amount - amount;
    const prevAmount = this.amount;

    let isEmpty = false;

    let finalAmount = newAmount;

    if (finalAmount <= 0) {
      this.item = "";
      finalAmount = 0;
      isEmpty = true;
    }

    this.amount = finalAmount;

    return [prevAmount - finalAmount, finalAmount, isEmpty];
  }

  has(itemName) {
    return this.item === itemName;
  }

  isEmpty() {
    return this.amount === 0 && this.item === "";
  }

  isEmptyOrHas(itemName) {
    return this.item === "" || this.item === itemName;
  }

  isEmptyOrHasAndIsNotFull(itemName) {
    if (this.amount === this.max) {
      return false;
    }

    return this.item === "" || this.item === itemName;
  }

  hasAmountOf(itemName, amount) {
    if (this.has(itemName)) {
      return this.hasAmount(amount);
    }

    return false;
  }

  canHoldXMore(amount) {
    return this.amount + amount <= this.max;
  }

  canHold(itemName, amount) {
    if (this.isEmptyOrHas(itemName)) {
      return this.canHoldXMore(amount);
    }

    return false;
  }
}

export class Power extends Node {
  constructor(data) {
    super(data);
  }

  add(amount) {
    let oldAmount = this.amount;
    let newAmount = this.amount + amount;

    if (this.max < newAmount) {
      newAmount = this.max;
    }

    this.amount = newAmount;

    return newAmount - oldAmount;
  }

  remove(amount) {
    const newAmount = this.amount - amount;
    const prevAmount = this.amount;

    let finalAmount = newAmount;
    let isEmpty;

    if (finalAmount < 0) {
      finalAmount = 0;
      isEmpty = true;
    } else {
      isEmpty = false;
    }

    this.amount = finalAmount;

    return [prevAmount - finalAmount, finalAmount, isEmpty];
  }

  hasPower(amount) {
    return this.amount - amount >= 0;
  }

  canHoldXMore(amount) {
    return this.amount + amount < this.max;
  }
}