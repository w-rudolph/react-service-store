import React from 'react';
import { connect } from '../base/connect';
import testService, { TestModel } from '../services/test.service';
import test2Service, { Test2Model } from '../services/test2.service';
import Test from './Test';

const handleClick = () => {
  testService.getTestData();
};

const handleClick2 = () => {
  test2Service.getTestData();
};

const Home = (props: any) => {
  return (
    <>
      <div>In Home Page</div>
      <div>Test1 Model: {JSON.stringify(props.test)}</div>
      <div>Test2 Model: {JSON.stringify(props.test2)}</div>
      <hr />
      <Test />
      <button onClick={handleClick}>Change test1</button>
      <button onClick={handleClick2}>Change test2</button>
    </>
  );
};
const injector1 = {
  inject: testService,
  mapToProps: (ret: TestModel) => {
    return {
      test: ret
    };
  }
};
const injector2 = {
  inject: test2Service,
  mapToProps: (ret: Test2Model) => {
    return {
      test2: ret
    };
  }
};
export default connect([injector1, injector2])(Home);
