import { TestBed } from '@angular/core/testing';

import { EditStateService } from './edit-state.service';

describe('EditStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditStateService = TestBed.get(EditStateService);
    expect(service).toBeTruthy();
  });
});
