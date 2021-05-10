
import { Menu } from './Menu'


/**
 * puedes borrar este ejemplo para tu entrega final
 */
const ejemplo = (texto:string, numero:number):void => {
  console.log(`
  
  Haz ingresado el texto: ${texto}  y el número ${numero}
  
  `);
  
}

(async () => {
  const menu = new Menu()
    while (menu.isActive()) {

      menu.printMenu()
      let key = await menu.getInt('seleccione un número de la lista:')
    
      switch (key) {
        case 0:
          console.log('0: ',key);
          menu.close()
          process.exit()

          break;
        
        case 1:
          console.log('Falta por implementar la opción: : ',key);
          break;
        
        case 2:
          console.log('Falta por implementar la opción: : ',key);
          break;
        
        case 3:
          console.log('Falta por implementar la opción: : ',key);
          break;
      
        case 4:
          console.log('Falta por implementar la opción: : ',key);
          break;
      
        case 5:
          console.log('Falta por implementar la opción: : ',key);
          break;
      
        case 6:
          console.log('Falta por implementar la opción: : ',key);
          break;
        
        case 7:
          /**Buenes borrar este caso para tu entrega final */
          
          const texto = await menu.getString('ingresa un texto cualquiera, luego preciona enter')
          const numero = await  menu.getInt('ingresa un número, luego preciona enter')
          ejemplo(texto,numero)
          break;
      
        default:
          console.log('Debe elegir una opción valida');
          //menu.close()
          break;
      }
    }
    
  console.log('Adios');
    
  })()


