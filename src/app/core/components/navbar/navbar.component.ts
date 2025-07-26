import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mood();
  }
  changeMode() {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  mood() {
    document.documentElement.classList.toggle(
      'dark',
      localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    if (
      document.documentElement.classList.toggle(
        'dark',
        localStorage.getItem('theme') === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
    ) {
    }
  }
}
