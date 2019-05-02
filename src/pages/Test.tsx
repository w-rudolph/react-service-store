import React from 'react';
import { connect } from 'react-store-service';
import testService, { TestModel } from '../services/test.service';

const Test = (props: any) => {
  return (
    <>
      <div>In Test page</div>
      <div>Test1 Model: {JSON.stringify(props.test)}</div>
    </>
  );
};

const injector = {
  inject: testService,
  mapToProps: (ret: TestModel) => {
    return {
      test: ret
    };
  }
};
export default connect([injector])(Test);
