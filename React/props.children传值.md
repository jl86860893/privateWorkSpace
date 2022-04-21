{
  React.Children.map(children, child => {
    return React.cloneElement(child, {
      params: () => ({
        token,
      }),
    })
  })
}