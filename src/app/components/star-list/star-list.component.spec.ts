import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { StarListComponent } from './star-list.component';

describe('StarListComponent', () => {
  let component: StarListComponent;
  let fixture: ComponentFixture<StarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [StarListComponent],
    }).compileComponents();
  });

  it('should have 5 full stars', () => {
    fixture = TestBed.createComponent(StarListComponent);
    component = fixture.componentInstance;
    component.rating = 5;
    fixture.detectChanges();

    const mathIconsLength = fixture.debugElement.queryAll(
      By.css('.star-list')
    ).length;
    expect(component.stars.length).toBe(5);
    expect(component.starIcons.length).toBe(5);
    expect(mathIconsLength).toBe(5);
  });

  it('should have 2 full stars, 1 half, two outline', () => {
    fixture = TestBed.createComponent(StarListComponent);
    component = fixture.componentInstance;
    component.rating = 2.5;
    fixture.detectChanges();

    const mathIconsLength = fixture.debugElement.queryAll(
      By.css('.star-list')
    ).length;
    const starIcons = component.starIcons;
    expect(starIcons.filter((star) => star === 'star').length).toBe(2);
    expect(starIcons.filter((star) => star === 'star_half').length).toBe(1);
    expect(starIcons.filter((star) => star === 'star_outline').length).toBe(2);
    expect(mathIconsLength).toBe(5);
  });

  it('should have 1 full stars, 1 half, 3 outline', () => {
    fixture = TestBed.createComponent(StarListComponent);
    component = fixture.componentInstance;
    component.rating = 1.5;
    fixture.detectChanges();

    const mathIconsLength = fixture.debugElement.queryAll(
      By.css('.star-list')
    ).length;
    const starIcons = component.starIcons;
    expect(starIcons.filter((star) => star === 'star').length).toBe(1);
    expect(starIcons.filter((star) => star === 'star_half').length).toBe(1);
    expect(starIcons.filter((star) => star === 'star_outline').length).toBe(3);
    expect(mathIconsLength).toBe(5);
  });

  it('should have 0 full stars, 1 half, 4 outline', () => {
    fixture = TestBed.createComponent(StarListComponent);
    component = fixture.componentInstance;
    component.rating = 0.5;
    fixture.detectChanges();

    const mathIconsLength = fixture.debugElement.queryAll(
      By.css('.star-list')
    ).length;
    const starIcons = component.starIcons;
    expect(starIcons.filter((star) => star === 'star').length).toBe(0);
    expect(starIcons.filter((star) => star === 'star_half').length).toBe(1);
    expect(starIcons.filter((star) => star === 'star_outline').length).toBe(4);
    expect(mathIconsLength).toBe(5);
  });

  it('should have 0 full stars, 0 half, 5 outline', () => {
    fixture = TestBed.createComponent(StarListComponent);
    component = fixture.componentInstance;
    component.rating = 0;
    fixture.detectChanges();

    const mathIconsLength = fixture.debugElement.queryAll(
      By.css('.star-list')
    ).length;
    const starIcons = component.starIcons;
    expect(starIcons.filter((star) => star === 'star').length).toBe(0);
    expect(starIcons.filter((star) => star === 'star_half').length).toBe(0);
    expect(starIcons.filter((star) => star === 'star_outline').length).toBe(5);
    expect(mathIconsLength).toBe(5);
  });

});
