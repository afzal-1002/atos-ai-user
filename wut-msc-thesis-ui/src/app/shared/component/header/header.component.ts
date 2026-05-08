import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { McpFrontendStateService } from '../../../services/mcp/mcp-frontend-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, NgIf, AsyncPipe]
})
export class HeaderComponent {
  // Input properties to support dynamic content for the AI Analysis page header
  @Input() pageTitle: string | null = null;
  @Input() backButtonLink: string | null = null;
  @Input() backButtonText: string = 'Back to Issue';

  constructor(
    private router: Router,
    public authService: AuthService,
    private mcpFrontendStateService: McpFrontendStateService
  ) {}

  logOut(): void {
    this.authService.logout();
    this.mcpFrontendStateService.clear();
    this.router.navigate(['/login']);
  }

  userLoggedIn(): void {
    this.router.navigate(['login'], { queryParams: { userLogedin: false } });
  }

  goToProfile(link: 'user-profile' | 'update-profile', id?: number | null): void {
    if (!id && this.authService.currentUser) id = this.authService.currentUser.id ?? null;
    if (id == null) return;
    this.router.navigate([link, id]);
  }
}