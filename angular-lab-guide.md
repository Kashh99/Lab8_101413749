# Angular Lab 08 - Step by Step Guide
## Data Binding, Directives, Custom Pipes and Custom Directives

This guide will walk you through completing Lab 08 on Angular Data Binding & Directives step by step.

## Prerequisites
1. Node.js and npm installed
2. Angular CLI installed (`npm install -g @angular/cli`)
3. Code editor (VS Code recommended)
4. Basic understanding of Angular concepts

## Setup
If continuing from previous labs, use your existing Angular project. If starting new:

```bash
# Create a new Angular project
ng new angular-lab08
cd angular-lab08

# Start the development server
ng serve --open
```

## Exercise #1 - Directives and Data Binding

### Step 1: Create the Hero Interface
Create a file named `hero.ts` in the `src/app` folder:

```typescript
export interface Hero {
  id: number;
  name: string;
}
```

### Step 2: Create Mock Heroes Data
Create a file named `mock-heroes.ts` in the `src/app` folder:

```typescript
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```

### Step 3: Generate Heroes Component
```bash
ng generate component heroes
```

### Step 4: Update Heroes Component
Edit `src/app/heroes/heroes.component.ts`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  standalone: true,  // Remove if not using standalone components
  imports: [CommonModule, FormsModule],  // Remove if not using standalone
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
```

### Step 5: Update Heroes Template
Edit `src/app/heroes/heroes.component.html`:

```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes"
      [class.selected]="hero === selectedHero"
      (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>

<div *ngIf="selectedHero">
  <h2>{{selectedHero.name | uppercase}} Details</h2>
  <div>id: {{selectedHero.id}}</div>
  <div>
    <label for="hero-name">Hero name: </label>
    <input id="hero-name" [(ngModel)]="selectedHero.name" placeholder="name">
  </div>
</div>
```

### Step 6: Add CSS Styles
Edit `src/app/heroes/heroes.component.css`:

```css
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}

.heroes li {
  display: flex;
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.heroes li:hover {
  color: #2c3a41;
  background-color: #e6e6e6;
  left: .1em;
}

.heroes li.selected {
  background-color: black;
  color: white;
}

.heroes li.selected:hover {
  background-color: #505050;
  color: white;
}

.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #405061;
  line-height: 1em;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}

input {
  padding: .5rem;
}
```

### Step 7: Update App Component
Edit `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Remove if not using standalone components
  imports: [HeroesComponent],  // Remove if not using standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```

### Step 8: Update App Component Template
Edit `src/app/app.component.html`:

```html
<h1>{{title}}</h1>
<app-heroes></app-heroes>
```

## Exercise #2 - Creating a Custom Pipe

### Step 1: Generate the Custom Pipe
```bash
ng generate pipe remove-spaces
```

### Step 2: Check App Module Updates
For non-standalone setups, verify `app.module.ts` has the pipe imported and declared:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { RemoveSpacesPipe } from './remove-spaces.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    RemoveSpacesPipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

For standalone components, update the Heroes component:

```typescript
// In heroes.component.ts
import { RemoveSpacesPipe } from '../remove-spaces.pipe';

@Component({
  // ...
  imports: [CommonModule, FormsModule, RemoveSpacesPipe],
  // ...
})
```

### Step 3: Update Mock Heroes Data
Add heroes with dashes to `src/app/mock-heroes.ts`:

```typescript
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
  { id: 21, name: 'super-man' },
  { id: 22, name: 'spider-man' }
];
```

### Step 4: Implement the Custom Pipe
Edit `src/app/remove-spaces.pipe.ts`:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpaces',
  standalone: true  // Remove if not using standalone
})
export class RemoveSpacesPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/-/g, '');
  }
}
```

### Step 5: Apply the Pipe in the Template
Edit `src/app/heroes/heroes.component.html` to use the pipe:

```html
<li *ngFor="let hero of heroes"
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name | removeSpaces}}
</li>
```

## Exercise #3 - Creating a Custom Directive

### Step 1: Generate the Custom Directive
```bash
ng generate directive input-format
```

### Step 2: Implement the Directive
Edit `src/app/input-format.directive.ts`:

```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputFormat]',
  standalone: true  // Remove if not using standalone
})
export class InputFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    this.el.nativeElement.value = value.toUpperCase();
  }
}
```

### Step 3: Import the Directive
For standalone components, update the Heroes component:

```typescript
// In heroes.component.ts
import { InputFormatDirective } from '../input-format.directive';

@Component({
  // ...
  imports: [CommonModule, FormsModule, RemoveSpacesPipe, InputFormatDirective],
  // ...
})
```

For non-standalone, check that it's in your app module.

### Step 4: Add Textbox with Directive
Edit `src/app/heroes/heroes.component.html` to add a textbox using the directive:

```html
<div>
  <label for="format-input">Test Custom Directive: </label>
  <input type="text" id="format-input" inputFormat>
</div>
```

## Homework - Nested Components

### Step 1: Generate Hero Detail Component
```bash
ng generate component hero-detail
```

### Step 2: Implement Hero Detail Component
Edit `src/app/hero-detail/hero-detail.component.ts`:

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  standalone: true,  // Remove if not using standalone
  imports: [CommonModule, FormsModule],  // Remove if not using standalone
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
}
```

### Step 3: Create the Hero Detail Template
Edit `src/app/hero-detail/hero-detail.component.html`:

```html
<div *ngIf="hero">
  <h2>{{hero.name | uppercase}} Details</h2>
  <div>id: {{hero.id}}</div>
  <div>
    <label for="hero-name">Hero name: </label>
    <input id="hero-name" [(ngModel)]="hero.name" placeholder="name">
  </div>
</div>
```

### Step 4: Update Heroes Component
Import the Hero Detail component in `src/app/heroes/heroes.component.ts`:

```typescript
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

@Component({
  // ...
  imports: [
    CommonModule, 
    FormsModule, 
    RemoveSpacesPipe, 
    InputFormatDirective, 
    HeroDetailComponent
  ],
  // ...
})
```

### Step 5: Use Hero Detail in Heroes Template
Replace the hero detail div in `src/app/heroes/heroes.component.html` with:

```html
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

## Testing Your Application

1. Run your application:
   ```bash
   ng serve
   ```

2. Open your browser to `http://localhost:4200`

3. Test the application functionality:
   - Click on heroes to display details
   - Verify the pipe removes dashes from hero names
   - Test the input directive by typing text and then clicking outside the textbox

## Preparing for Submission

### Take Screenshots
Capture screenshots showing:
- The full application with heroes list and details
- The custom pipe in action (showing heroes with dashes having them removed)
- The custom directive in action (showing text before and after it's converted to uppercase)

### Create a Zip File
```bash
# Navigate to parent directory
cd ..
# Create zip file
zip -r angular-lab08.zip ./angular-lab08
```

### GitHub Submission
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Lab 08 - Angular Data Binding & Directives"
   git branch -M main
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

### Final Submission
Submit:
1. Screenshots in a Word document
2. Zip file of your project
3. GitHub repository link

## Troubleshooting Common Issues

### Module Not Found Errors
- Ensure paths are correct in your imports
- Check that components are properly declared in modules (for non-standalone)
- For standalone components, ensure all dependencies are imported

### Directive Not Working
- Make sure the directive is properly imported in the component
- Verify the attribute selector is correctly applied to the input element

### Pipe Not Transforming Text
- Check that the pipe is properly imported
- Ensure the pipe logic correctly replaces dashes with empty strings

### FormsModule Issues
- Ensure FormsModule is imported in your component or module
- Check for any console errors related to ngModel binding
