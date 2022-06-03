export class Utils {
  public static titleCase(text: string): string {
    return (
      text.charAt(0).toLocaleUpperCase() + text.slice(1).toLocaleLowerCase()
    );
  }
  public static getCurrentDate(): Date {
    const currentDate = new Date(Date.parse(Date()));
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return currentDate;
  }
}
