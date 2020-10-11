
export const sanitize = (crop) => ({
    common_name: crop.common_name.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-'),
    scientific_name: crop.scientific_name.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-'),
    pests: crop.pests.replace(/[^\w,]/gi, '').split(','),
    rooting_depth: crop.rooting_depth,
    foot_print: crop.foot_print,
    light_needs: crop.light_needs,
    nutrient_needs: crop.nutrient_needs,
    water_needs: crop.water_needs,
    time_in_field: crop.time_in_field,
    family: crop.family.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-'),
    labor: crop.labor,
    profit: crop.profit
});