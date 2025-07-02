import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  user: any = null;
  loading = true;
  hasActivity = false;
  stats = {
    resumesCreated: 0,
    applicationsSubmitted: 0,
    interviewsScheduled: 0,
    successRate: 0,
  };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUserData();
    this.loadStats();
  }

  private loadUserData(): void {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        this.user = JSON.parse(userString);
        this.loading = false;
      } else {
        this.api.getCurrentUser().subscribe({
          next: (user) => {
            this.user = user;
            this.loading = false;
          },
          error: () => {
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
          },
        });
      }
    } catch (error) {
      console.error('Error parsing user data', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  private loadStats(): void {
    setTimeout(() => {
      this.stats = {
        resumesCreated: 5,
        applicationsSubmitted: 12,
        interviewsScheduled: 3,
        successRate: 25,
      };
    }, 1000);
  }

  onUploadResume(): void {
    console.log('Upload resume clicked');
  }

  onCreateNew(): void {
    console.log('Create new resume clicked');
  }

  onViewTemplates(): void {
    console.log('View templates clicked');
  }

  onViewAllActivity(): void {
    console.log('View all activity clicked');
  }
}
