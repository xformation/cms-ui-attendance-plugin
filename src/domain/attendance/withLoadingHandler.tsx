import * as React from 'react';

export default class LoadingHandler extends React.Component<any, any>{
  render() {
    return (
      <h1>Loading ...</h1>
    );
  }
}
// const withLoadingHandler = (TheComponent: any) => {
//   const LoadingHandlerWrapper = (props: any) =>
//     props.data.loading ? <h1>Loading</h1> : <TheComponent {...props} />;
//   return LoadingHandlerWrapper;
// };

// export default withLoadingHandler;
