import React, { Component } from 'react';
import { Subject, Unsubscribe } from './subject';

type InjectorFn = (val?: any) => any;
type Injector = {
  inject: Subject;
  mapToProps: InjectorFn;
};
type InjectState = {
  injectState: any;
  injectUnsubs: Unsubscribe[];
};

export function connect(injectors: Injector[]) {
  return function(WrappedComponent: React.FC) {
    return class extends Component {
      constructor(props: any, state: any) {
        super(props, state);
        this.state = {
          injectState: {},
          injectUnsubs: []
        };
      }
      componentWillMount() {
        let newInjectState = {};
        let injectUnsubs: Unsubscribe[] = [];
        injectors.forEach(injector => {
          const injectUnsub = injector.inject.subscribe((ret: any) => {
            newInjectState = {
              ...newInjectState,
              ...injector.mapToProps(ret)
            };
            this.setState({
              injectState: newInjectState
            });
          });
          injectUnsubs.push(injectUnsub);
        });
        this.setState({
          injectUnsubs: injectUnsubs
        });
      }

      componentWillUnmount() {
        const injectState = this.state as InjectState;
        injectState.injectUnsubs.forEach(unsub => {
          unsub();
        });
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...(this.state as InjectState).injectState}
          />
        );
      }
    };
  };
}
