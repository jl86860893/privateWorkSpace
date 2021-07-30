# grid布局
```tsx
<Container>
  <Header></Header>
  <Nav></Nav>
  <Main>
    {children}
  </Main>
  <Aside></Aside>
  <Footer></Footer>
</Container>

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
grid-template-columns: 20rem 1fr 20rem;
grid-template-areas:
"header header header"
"nav main aside"
"footer footer footer"
height: 100vh;
`
const Header = styled.header`grid-areas: header`
const Main = styled.header`grid-areas: main`
const Nav = styled.header`grid-areas: nav`
const Aside = styled.header`grid-areas: aside`
const Footer = styled.header`grid-areas: footer`

```

# css组件
```tsx
import styled from '@emotion/styled';

export const Row = styled.div<{
  gap?: number | boolean,
  between?: boolean,
  marginBottom?: number
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined}
margin-bottom: ${props => props.marginBottom + 'rem'}
> * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`
```

```tsx
<Header gap={true}></Header>

const Header = styled(Row)`
hustify-content: space-between;`
```

# 内联样式
```tsx
/** @jsx jsx */
import { jsx } from '@emotion/react'

<div css={{ marginBottom: '2rem', > * 'padding: 5rem' }}></div>
```

# 正确引入svg
```tsx
import { ReactComponent as Logo } from 'xxx.svg'
<Logo color={'rgb(111,111,111)'} />
```