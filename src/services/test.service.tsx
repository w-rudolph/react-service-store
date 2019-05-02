import { BehaviorSubject } from 'react-store-service';

export type TestModel = {
  a: number;
};

export class TestService extends BehaviorSubject<TestModel> {
  getTestData() {
    this.next({
      a: Math.random()
    });
  }
}

export default new TestService({
  a: 1
});
