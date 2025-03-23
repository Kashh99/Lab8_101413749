import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { RemoveSpacesPipe } from '../remove-spaces.pipe';
import { InputFormatDirective } from '../input-format.directive';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RemoveSpacesPipe, 
    InputFormatDirective
  ],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;
  pageSize = 4;
  currentPage = 1;

  get pagedHeroes() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.heroes.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.heroes.length / this.pageSize);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}