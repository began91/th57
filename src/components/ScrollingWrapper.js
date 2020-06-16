import React from 'react'
import styled from 'styled-components'

class ScrollingWrapper extends React.Component {
  state = { hasScrolled: false }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    if (window.pageYOffset > 200 && !this.state.hasScrolled) {
      this.setState({ hasScrolled: true })
    } else if (window.pageYOffset < 200 && this.state.hasScrolled) {
      this.setState({ hasScrolled: false })
    }
  }

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.hasScrolled && (
          <ScrollToTopIconContainer>
            <Button onClick={this.scrollToTop}>&#8593;</Button>
          </ScrollToTopIconContainer>
        )}
      </React.Fragment>
    )
  }
}

export default ScrollingWrapper;

const ScrollToTopIconContainer = styled.div`
  position: fixed;
  bottom: 60px;
  right: 10px;
  z-index: 2;
  opacity: 0.4;
  text-align: center;
  &:hover {
    opacity: 1;
    animation: wiggle 1s ease;
    animation-iteration-count: 1;
  }
  @keyframes wiggle {
    20% { transform: translateY(6px); }
    40% { transform: translateY(-6px); }
    60% { transform: translateY(4px); }
    80% { transform: translateY(-2px); }
    100% { transform: translateY(0); }
  }
  `
  
  const Button = styled.div`
  background: black;
  color: white;
  font-family: Teko;
  font-size: 50px;
  line-height: 50px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  vertical-align: center;
  cursor: pointer;
  `
  
/* modified from https://levelup.gitconnected.com/building-a-componentized-and-reusable-scroll-to-top-feature-in-react-7fa5ac8d4c2d*/
