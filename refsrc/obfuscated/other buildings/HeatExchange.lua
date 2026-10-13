local v1 = {};

function round(p2, p3)
    local v4 = 10 ^ (p3 or 0);

    return math.floor(p2 * v4 + 0.5) / v4;
end;

function v1.newHeat(p5, p6, p7, p8) -- Line: 8
    local v9 = p5 + p7;

    if v9 == 0 then
        return p8;
    end;

    return round((p5 * p6 + p7 * p8) / v9, 2);
end;

function v1.heatDilute(p10, p11, p12, p13, p14) -- Line: 15
    return -((p13 - p12) / (p11 + 0.01) / 6 / 1200 * (p14 == nil and 1 or p14));
end;

function v1.heatDiluteOptimized(p15, p16, p17, p18, p19) -- Line: 33
    return -((p18 - p17) * (100 / (p15 or 100)) / (p16 + 0.01) / 6 / 1200 * (p19 == nil and 1 or p19));
end;

return v1;