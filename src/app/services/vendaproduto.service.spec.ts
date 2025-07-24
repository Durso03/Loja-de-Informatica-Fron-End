import { TestBed } from '@angular/core/testing';

import { VendaprodutoService } from './vendaproduto.service';

describe('VendaprodutoService', () => {
  let service: VendaprodutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendaprodutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
