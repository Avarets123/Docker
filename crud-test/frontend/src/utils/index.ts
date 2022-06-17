export const isNotEmpty = (obj: any): boolean => {

    if (!obj) return false;


    if (typeof obj === 'object' && Object.keys(obj).length > 0) {
        return true;
    }

    return false;

}