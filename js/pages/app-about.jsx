
export class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className='about'>
          <div className='Amit developer-container'>
            <img src='assets/img/amit.jpg' />
            <div className='about-us-container'>
              <span className='dev'>Amit Rozen - emails and books</span>
              <span>27 Years Old</span>
              <span>Tel-Aviv</span>
              <span>Fullstack Developer</span>
              <span>Looking forward to my next Project.</span>
            </div>
          </div>
          <div className='Opal developer-container'>
            <img src='assets/img/opal.jpg' />
            <div className='about-us-container'>
              <span className='dev'>Opal Pinchas</span>
              <span>20 Years Old</span>
              <span>Netanya</span>
              <span>Fullstack Developer</span>
              <span>Looking forward to my next Project.</span>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}