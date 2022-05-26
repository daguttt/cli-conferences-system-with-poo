export class Utils {
  public static titleCase(text: string): string {
    return (
      text.charAt(0).toLocaleUpperCase() + text.slice(1).toLocaleLowerCase()
    );
  }
}
