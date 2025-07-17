export class Utils {
    /**
     * Formatea una fecha DATE a formato yyyy-MM-dd
     * @param date 
     * @returns 
     */
    static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        var day = String(date.getDate()+1).padStart(2, '0');
        if(Number(day) ===32) {
            day='01';
        }
        
        return `${year}-${month}-${day}`;
    }
}