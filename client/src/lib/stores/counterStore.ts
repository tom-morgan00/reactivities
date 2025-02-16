import { makeAutoObservable } from "mobx";

export default class CounterStore {
  title = "Counter store";
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment = (amount = 1) => {
    this.counter += amount;
  };

  decrement = (amount = 1) => {
    this.counter -= amount;
  };
}
