export default function capitalizeFirstChar(str) {
    // Check if the string is valid
    if (!str || str.length === 0) {
        return str;
    }

    // Capitalize the first character and add the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
}