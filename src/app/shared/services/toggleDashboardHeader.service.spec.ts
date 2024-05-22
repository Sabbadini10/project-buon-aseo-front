/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToggleDashboardHeaderService } from './toggleDashboardHeader.service';

describe('Service: ToggleDashboardHeader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToggleDashboardHeaderService]
    });
  });

  it('should ...', inject([ToggleDashboardHeaderService], (service: ToggleDashboardHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
