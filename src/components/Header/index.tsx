import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TypographyStyled = styled(Typography)`
  flex-grow: 1;
  display: none;
  @media (min-width: 600px) {
    display: block;
  }
`;

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <TypographyStyled variant="h6" noWrap>
          Cocktails
        </TypographyStyled>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
