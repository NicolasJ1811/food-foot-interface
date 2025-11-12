import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

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
    public emojis: string
  ) {}
}

const MEALS_DATA: Meal[] = [
  new Meal(
    'Œuf dur',
    MealType.Breakfast,
    true,
    'Bon :\nPuissance et endurance,\nbut assuré !',
    '🥚🥖🥅'
  ),
  new Meal(
    "Jus d'orange",
    MealType.Breakfast,
    false,
    'Déconseillé :\nUne gorgée, un sprint…\npuis KO.',
    '🍞🧀😴'
  ),
  new Meal(
    'Céréales sucrées',
    MealType.Breakfast,
    false,
    'Déconseillé :\nBeaucoup de sucre,\npeu de passes réussies.',
    '🥣🍬❌'
  ),
  new Meal(
    'Céréales chocolatées',
    MealType.Breakfast,
    false,
    'Un but… puis\nchute de sucre !',
    '🥣🍫⬇️'
  ),
  new Meal(
    'Lait',
    MealType.Breakfast,
    true,
    'Bon :\nSolide dans les duels,\nmerci calcium !',
    '💪⚽'
  ),
  new Meal(
    'Tartine à la confiture',
    MealType.Breakfast,
    true,
    'Acceptable :\nAccélère vite, mais perd\nle ballon ensuite.',
    '🍞🍓➡️😮'
  ),
  new Meal(
    "Jus d'orange pressé",
    MealType.Breakfast,
    true,
    'Acceptable :\nUn tir puissant\nmais courte durée.',
    '🍊⚡⏳'
  ),
  new Meal(
    'Porridge',
    MealType.Breakfast,
    true,
    'Bon :\nIl tient 90 minutes\nsans faiblir !',
    '🥣💯⏱️'
  ),
  new Meal('Café', MealType.Breakfast, false, 'Il sprinte… puis s’écroule !', '⚡➡️🥱'),
  new Meal(
    'Coca',
    MealType.Breakfast,
    false,
    'Il part vite… et s’éteint\ncomme une canette vide.',
    '🥤💥💤'
  ),
  new Meal(
    'Coca Zéro',
    MealType.Breakfast,
    false,
    'Courir à l’aspartame ?\nPas champion ça !',
    '🥤🚫⚽️'
  ),
  new Meal(
    'Croissant',
    MealType.Breakfast,
    false,
    'Déconseillé :\nIl tente la bicyclette…\nmais reste coincé au sol.',
    '🥐😅'
  ),
  new Meal(
    'Thé glacé (Nestea)',
    MealType.Breakfast,
    false,
    'Déconseillé :\nIl dribble avec du sucre,\npas d’énergie.',
    '🍬🤹'
  ),
  new Meal(
    'Salade de fruits',
    MealType.Breakfast,
    true,
    'Bon :\nDes dribbles vitaminés,\nfrais comme l’orange.',
    '🍎⚡🤸'
  ),
  new Meal(
    'Sandwich jambon‑fromage',
    MealType.Breakfast,
    true,
    'Bon :\nTacles propres,\nénergie sans gras !',
    '🥓💪'
  ),
  new Meal(
    'Toast aux radis',
    MealType.Breakfast,
    true,
    'Bon :\nUne défense béton,\nsolide jusqu’au bout.',
    '🥖🥒🧱'
  ),
  new Meal(
    'Yaourt',
    MealType.Breakfast,
    true,
    'Bon :\nMuscles prêts,\nballon bien contrôlé.',
    '🦵⚽️'
  ),
  new Meal(
    'Yaourt aux fruits',
    MealType.Breakfast,
    true,
    'Un petit boost…\nmais attention au sucre !',
    '🍓⚡'
  ),
];

@Component({
  selector: 'app-meals',
  imports: [MatTableModule],
  templateUrl: './meals.html',
  styleUrl: './meals.css',
})
export class Meals {
  displayedColumns: string[] = ['name', 'mealType', 'isGood', 'explanation', 'emojis'];
  dataSource = MEALS_DATA;
}
