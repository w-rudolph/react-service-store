import { BehaviorSubject } from 'react-store-service';

export type Test2Model = {
  b: number;
};

export class Test2Service extends BehaviorSubject<Test2Model> {
  getTestData() {
    this.next({
      b: Math.random()
    });
  }
}

export default new Test2Service({
  b: 2
});
