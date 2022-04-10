import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';
const listCartBookMock: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7,
  },
];
describe('CartComponent', () => {
  let component: CartComponent;
  // permite extraer el servicio que se usa en el componente
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;
  // se ejecuta antes de cada test
  // Configuración del test unitario
  beforeEach(async () => {
    // parecido al modulo de angular
    await TestBed.configureTestingModule({
      imports: [
        //realiza peticiones falsas para los servicios
        HttpClientTestingModule,
        // No tira error pero haria peticiones reales
        // HttpClientModule
      ],
      declarations: [CartComponent],
      providers: [
        BookService,
        // si usamos esto hariamos peticiones reales a la api y no se hacen asi los test unitarios
        // HttpClient,
        // HttpHandler,
      ],
      // evitamos algunos problemas de errores en tests, poner siempre
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });
  // ngOnInit(): void {
  //   this.listCartBook = this._bookService.getBooksFromCart();
  //   this.totalPrice = this.getTotalPrice(this.listCartBook);
  // }
  // instanciamos el componente
  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    // entra al ngOnInit
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);

    // mockeo el ngOnInit
    jest
      .spyOn(service, 'getBooksFromCart')
      .mockImplementation(() => listCartBookMock);
  });
  afterEach(() => {
    fixture.destroy();
    jest.clearAllMocks();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // public getTotalPrice(listCartBookMock: Book[]): number {
  //   let totalPrice = 0;
  //   listCartBook.forEach((book: Book) => {
  //     totalPrice += book.amount * book.price;
  //   });
  //   return totalPrice;
  // }

  // Testeamos un metodo con return
  it('getTotalPrice returns an amount', () => {
    // arrange y act
    const totalPrice = component.getTotalPrice(listCartBookMock);

    // assert
    expect(totalPrice).toBeGreaterThan(0);
    // expect(totalPrice).not.toBe(0);
    // expect(totalPrice).not.toBeNull();
  });

  // public onInputNumberChange(action: string, book: Book): void {
  //   const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
  //   book.amount = Number(amount);
  //   this.listCartBook = this._bookService.updateAmountBook(book);
  //   this.totalPrice = this.getTotalPrice(this.listCartBook);
  // }

  // Testeamos un metodo sin return
  it('onInputNumberChange increments correctly', () => {
    // arrange
    const action = 'plus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };
    // un test unitario debe llamar metodos de su propia clase y si es de otro servicio se
    // simula.

    // Error es privado y no tenemos acceso
    // const service = component._bookService;

    // Esto lo permite aunque sea privado pero perdemos el tipado de typescript
    // const service = (component as any)._bookService;

    // Tampoco es una buena forma de hacerlo
    // const service = component['_bookService'];

    // para versiones viejas de angular < 9
    // const service = TestBed.get(BookService);

    // Forma correcta de obtener servicios a partir de angular 9
    // es mejor instanciarlo en el beforeEach porque lo voy a usar desde otros tests
    // const service = fixture.debugElement.injector.get(BookService);

    // act
    const spy1 = jest
      .spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    expect(book.amount).toBe(2);
    // antes de llamarse a esta funcion los espias tienen que estar declarados con anterioridad
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(3);
    // assert
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
  // Testeamos un metodo sin return
  it('onInputNumberChange decrements correctly', () => {
    // arrange
    const action = 'minus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };
    // Ver explicación anterior
    // act
    const spy1 = jest
      .spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    expect(book.amount).toBe(2);
    // antes de llamarse a esta funcion los espias tienen que estar declarados con anterioridad
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(1);
    // otra forma de hacerlo
    // expect(book.amount === 1).toBe(true);
    // expect(book.amount === 1).toBeTruthy();
    // assert
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  // public onClearBooks(): void {
  //   if (this.listCartBook && this.listCartBook.length > 0) {
  //     this._clearListCartBook();
  //   } else {
  //      console.log("No books available");
  //   }
  // }
  // private _clearListCartBook() {
  //   this.listCartBook = [];
  //   this._bookService.removeBooksFromCart();
  // }
  it('onClearBooks should be clear cart', () => {
    // arrange
    component.listCartBook = listCartBookMock;
    const spy1 = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);

    // Error no anda porque si mockeo _clearListCartBook para que devuelva null
    // que es llamada desde onClearBooks nunca se va a poder ejecutar removeBooksFromCart
    // de bookService que esta dentro de la función privada _clearListCartBook y como nunca
    // se llama el expect del spy1 falla

    // const spy2 = jest
    //   .spyOn(component as any, '_clearListCartBook')
    //   .mockImplementation(() => null);

    // espia a un metodo privado con as any
    const spy2 = jest.spyOn(component as any, '_clearListCartBook');

    // act
    component.onClearBooks();
    // assert
    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
  it('_clearListCartBook work correctly', () => {
    // arrange
    const spy1 = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);
    component.listCartBook = listCartBookMock;

    // act
    component['_clearListCartBook']();
    // assert
    expect(spy1).toHaveBeenCalledTimes(1);
  });
});
