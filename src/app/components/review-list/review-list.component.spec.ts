import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { BusinessReview } from 'src/app/models/business-review.model';
import { BusinessState } from 'src/app/state/business/business.state';
import { ReviewListComponent } from './review-list.component';

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([BusinessState]), HttpClientModule],
      providers: [Store],
      declarations: [ReviewListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
    const review: Partial<BusinessReview> = {};
    component.reviews.push(review as BusinessReview);
    component.reviews.push(review as BusinessReview);
    component.reviews.push(review as BusinessReview);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 review-card', () => {
    const reviewsList = fixture.debugElement.queryAll(By.css('.review-card'));
    const starsList = fixture.debugElement.queryAll(By.css('app-star-list'));
    expect(reviewsList.length).toBe(3);
    expect(starsList.length).toBe(3);
  });

  it('should have 3 review-images', () => {
    const reviewImages = fixture.debugElement.queryAll(By.css('.review-image'));
    expect(reviewImages.length).toBe(3);
  });

  it('should have 3 app-star-list child components', () => {
    const reviewImages = fixture.debugElement.queryAll(By.css('app-star-list'));
    expect(reviewImages.length).toBe(3);
  });
  it('should have 3 names', () => {
    const names = fixture.debugElement.queryAll(By.css('.name'));
    expect(names.length).toBe(3);
  });
});
