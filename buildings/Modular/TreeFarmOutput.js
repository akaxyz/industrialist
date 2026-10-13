export default {
  id: "TreeFarmOutput",
  category: "Modular",
  cost: 200,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 10,
      transferAmount: 5,
      siteOffset: {
        y: -3,
        x: -1.0780029296875
      },
      gameOffset: {
        y: 1.9199857711791992,
        x: -1.0780029296875,
        z: -3
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal v1 = {};\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal Account = script.Parent.Account;\nAccount.Changed:Connect(function() -- Line: 13\n    -- upvalues: Account (copy), u2 (copy)\n    local v3 = Account:GetAttribute(\"Material\");\n\n    if v3 == nil then\n        return;\n    end;\n\n    local Value = Account.Value;\n\n    if u2:canHoldXMoreOf(v3, Value) then\n        u2:addItemAmount(v3, Value);\n        Account:SetAttribute(\"Material\", nil);\n        Account.Value = 0;\n    end;\nend);\n\nfunction v1.tick() -- Line: 25\n    -- upvalues: Account (copy), u2 (copy)\n    if Account.Value ~= 0 then\n        local v4 = Account:GetAttribute(\"Material\");\n\n        if v4 == nil then\n            return;\n        end;\n\n        local Value = Account.Value;\n\n        if u2:canHoldXMoreOf(v4, Value) then\n            u2:addItemAmount(v4, Value);\n            Account:SetAttribute(\"Material\", nil);\n            Account.Value = 0;\n        end;\n    end;\nend;\n\nreturn v1;"
};
