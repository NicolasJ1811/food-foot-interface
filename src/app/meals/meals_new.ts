import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
}

export class Meal {
  constructor(
    public name: string,
    public type: MealType,
    public isGood: boolean,
    public explanation: string,
    public emojis: string,
    public image?: string
  ) {}
}
const BREAKFAST_MEALS: Meal[] = [];
// const BREAKFAST_MEALS2: Meal[] = [
//   new Meal('Œuf dur', MealType.Breakfast, true, 'Bon :\nPuissance et endurance,\nbut assuré !', '🥚🥖🥅'),
//   new Meal("Jus d'orange", MealType.Breakfast, false, 'Déconseillé :\nUne gorgée, un sprint…\npuis KO.', '🍞🧀😴'),
//   new Meal('Céréales sucrées', MealType.Breakfast, false, 'Déconseillé :\nBeaucoup de sucre,\npeu de passes réussies.', '🥣🍬❌'),
//   new Meal('Céréales chocolatées', MealType.Breakfast, false, 'Un but… puis\nchute de sucre !', '🥣🍫⬇️'),
//   new Meal('Lait', MealType.Breakfast, true, 'Bon :\nSolide dans les duels,\nmerci calcium !', '💪⚽'),
//   new Meal('Tartine à la confiture', MealType.Breakfast, true, 'Acceptable :\nAccélère vite, mais perd\nle ballon ensuite.', '🍞🍓➡️😮'),
//   new Meal("Jus d'orange pressé", MealType.Breakfast, true, 'Acceptable :\nUn tir puissant\nmais courte durée.', '🍊⚡⏳'),
//   new Meal('Porridge', MealType.Breakfast, true, 'Bon :\nIl tient 90 minutes\nsans faiblir !', '🥣💯⏱️'),
//   new Meal('Café', MealType.Breakfast, false, 'Il sprinte… puis s'écroule !', '⚡➡️🥱'),
//   new Meal('Coca', MealType.Breakfast, false, 'Il part vite… et s'éteint\ncomme une canette vide.', '🥤💥💤'),
//   new Meal('Coca Zéro', MealType.Breakfast, false, 'Courir à l'aspartame ?\nPas champion ça !', '🥤🚫⚽️'),
//   new Meal('Croissant', MealType.Breakfast, false, 'Déconseillé :\nIl tente la bicyclette…\nmais reste coincé au sol.', '🥐😅'),
//   new Meal('Thé glacé (Nestea)', MealType.Breakfast, false, 'Déconseillé :\nIl dribble avec du sucre,\npas d'énergie.', '🍬🤹'),
//   new Meal('Salade de fruits', MealType.Breakfast, true, 'Bon :\nDes dribbles vitaminés,\nfrais comme l'orange.', '🍎⚡🤸'),
//   new Meal('Sandwich jambon‑fromage', MealType.Breakfast, true, 'Bon :\nTacles propres,\nénergie sans gras !', '🥓💪'),
//   new Meal('Toast aux radis', MealType.Breakfast, true, 'Bon :\nUne défense béton,\nsolide jusqu'au bout.', '🥖🥒🧱'),
//   new Meal('Yaourt', MealType.Breakfast, true, 'Bon :\nMuscles prêts,\nballon bien contrôlé.', '🦵⚽️'),
//   new Meal('Yaourt aux fruits', MealType.Breakfast, true, 'Un petit boost…\nmais attention au sucre !', '🍓⚡'),
// ];

const LUNCH_MEALS: Meal[] = [];

const DINNER_MEALS: Meal[] = [];

@Component({
  selector: 'app-meals',
  imports: [MatTableModule, CommonModule, FormsModule],
  templateUrl: './meals.html',
  styleUrl: './meals.css',
})
export class Meals {
  breakfastMeals = BREAKFAST_MEALS;
  lunchMeals = LUNCH_MEALS;
  dinnerMeals = DINNER_MEALS;
  activeTab: 'breakfast' | 'lunch' | 'dinner' = 'breakfast';
  dataSource: Meal[] = BREAKFAST_MEALS;
  showAddForm = false;
  isEditing = false;
  editingIndex: number | null = null;
  lastAddedIndex: number | null = null;
  removingIndex: number | null = null;
  isDragOver = false;
  newMeal: Partial<Meal> = {
    name: '',
    type: MealType.Breakfast,
    isGood: true,
    explanation: '',
    emojis: '',
    image: '',
  };

  switchTab(tab: 'breakfast' | 'lunch' | 'dinner') {
    this.activeTab = tab;
    if (tab === 'breakfast') {
      this.dataSource = this.breakfastMeals;
      this.newMeal.type = MealType.Breakfast;
    } else if (tab === 'lunch') {
      this.dataSource = this.lunchMeals;
      this.newMeal.type = MealType.Lunch;
    } else {
      this.dataSource = this.dinnerMeals;
      this.newMeal.type = MealType.Dinner;
    }
    this.resetIndices();
  }

  private resetIndices() {
    this.lastAddedIndex = null;
    this.removingIndex = null;
  }

  openAddForm() {
    this.showAddForm = true;
    this.newMeal = {
      name: '',
      type: this.getDefaultMealType(),
      isGood: true,
      explanation: '',
      emojis: '',
      image: '',
    };
    this.isEditing = false;
    this.editingIndex = null;
  }

  private getDefaultMealType(): MealType {
    if (this.activeTab === 'breakfast') return MealType.Breakfast;
    if (this.activeTab === 'lunch') return MealType.Lunch;
    return MealType.Dinner;
  }

  closeAddForm() {
    this.showAddForm = false;
    this.newMeal = {
      name: '',
      type: this.getDefaultMealType(),
      isGood: true,
      explanation: '',
      emojis: '',
      image: '',
    };
    this.isEditing = false;
    this.editingIndex = null;
  }

  addMeal() {
    if (
      this.newMeal.name &&
      this.newMeal.type &&
      this.newMeal.explanation &&
      this.newMeal.emojis
    ) {
      const meal = new Meal(
        this.newMeal.name,
        this.newMeal.type as MealType,
        this.newMeal.isGood || false,
        this.newMeal.explanation,
        this.newMeal.emojis,
        this.newMeal.image
      );
      this.dataSource = [...this.dataSource, meal];
      this.closeAddForm();
    }
  }

  async saveMeal() {
    if (
      !this.newMeal.name ||
      !this.newMeal.type ||
      !this.newMeal.explanation ||
      !this.newMeal.emojis
    ) {
      return;
    }

    const meal = new Meal(
      this.newMeal.name,
      this.newMeal.type as MealType,
      this.newMeal.isGood || false,
      this.newMeal.explanation,
      this.newMeal.emojis,
      this.newMeal.image
    );

    if (this.isEditing && this.editingIndex !== null && this.editingIndex >= 0) {
      // Update existing meal in place
      this.dataSource[this.editingIndex] = meal;
      this.dataSource = [...this.dataSource];
      this.closeAddForm();
      return;
    }

    // Not editing: scroll container to bottom first so user can see the end
    await this.scrollContainerToBottom();

    // Append new meal and animate it
    this.dataSource = [...this.dataSource, meal];
    this.lastAddedIndex = this.dataSource.length - 1;

    // After DOM update, ensure the new card is visible (scroll into view)
    setTimeout(() => {
      const container = document.querySelector('.meals-container') as HTMLElement | null;
      if (container) {
        const cards = container.querySelectorAll('.meal-card');
        const last = cards[cards.length - 1] as HTMLElement | undefined;
        if (last) {
          last.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
          // fallback: scroll to bottom
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
      }
    }, 60);

    // Clear the 'new' class after the animation finishes
    setTimeout(() => (this.lastAddedIndex = null), 1100);

    this.closeAddForm();
  }

  private scrollContainerToBottom(timeout = 300) {
    return new Promise<void>(resolve => {
      const container = document.querySelector('.meals-container') as HTMLElement | null;
      if (!container) {
        resolve();
        return;
      }
      // Smooth scroll to bottom first
      try {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      } catch (e) {
        // some environments may not support smooth option
        container.scrollTop = container.scrollHeight;
      }
      // Wait for the scroll animation to complete (approx)
      setTimeout(() => resolve(), timeout);
    });
  }

  onUpdate(meal: Meal) {
    // Open the edit form pre-filled for the selected meal
    this.openEditForm(meal);
  }

  openEditForm(meal: Meal) {
    this.isEditing = true;
    this.showAddForm = true;
    this.editingIndex = this.dataSource.indexOf(meal);
    this.newMeal = {
      name: meal.name,
      type: meal.type,
      isGood: meal.isGood,
      explanation: meal.explanation,
      emojis: meal.emojis,
      image: meal.image,
    };
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.readImageFile(file);
  }

  private readImageFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.newMeal.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    this.readImageFile(file);
  }

  removeImage() {
    if (this.newMeal) {
      this.newMeal.image = '';
    }
  }

  onDelete(meal: Meal) {
    console.log('Delete meal:', meal);
    // Animate removal then delete from datasource
    const index = this.dataSource.indexOf(meal);
    if (index > -1) {
      this.removingIndex = index;
      // wait for animation to finish before removing
      setTimeout(() => {
        // remove only if still valid index (items may have shifted)
        const currentIndex = this.dataSource.indexOf(meal);
        if (currentIndex > -1) {
          this.dataSource.splice(currentIndex, 1);
          this.dataSource = [...this.dataSource]; // Trigger change detection
        }
        this.removingIndex = null;
      }, 740);
    }
  }
}
