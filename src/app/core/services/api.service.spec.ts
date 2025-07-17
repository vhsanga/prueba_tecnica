import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders } from '@angular/core';
import { environment } from '../../../environments/environment';

describe('ApiServices', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService // 👈 Esto configura HttpClient en modo test
      ],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ✅ Verifica que no haya peticiones pendientes
  });

  it('Crear un nuevo producto', () => {
    const json = {
            id: "dos",
            name: "Cuenta de ahorros",
            description: "Cuenta de ahorros del usuario",
            logo: "assets1.png",
            date_release: "2025-01-01",
            date_revision: "2025-01-01" 
          };
    const mockResponse = { data: [ { ...json } ]};
    service.post('bp/products', {}).subscribe(response => {
      console.log("metodo mock response:"+JSON.stringify(response));
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/bp/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);  // 👈 Devuelve la respuesta simulada
  });

  it('Obtener lista de productos', () => {
    const mockResponse = { data: [{
            id: "dos",
            name: "Cuenta de ahorros",
            description: "Cuenta de ahorros del usuario",
            logo: "assets1.png",
            date_release: "2025-01-01",
            date_revision: "2025-01-01" 
          }] };
    service.get('bp/products', {}).subscribe(response => {
      console.log("metodo mock response:"+JSON.stringify(response));
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/bp/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);  // 👈 Devuelve la respuesta simulada
  });

  


});
