export function capitalize(str: string){
    const capitalizeString = `${str[0].toUpperCase() + str.slice(1)}`;
    return capitalizeString;
}