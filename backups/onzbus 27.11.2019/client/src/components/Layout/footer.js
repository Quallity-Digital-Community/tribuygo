/*import React from "react";

function Footer() {
  return (
  	<div className ="footerfile">
     <footer className="sticky-footer bg-red">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright © Quality Digital Community 2019</span>
          </div>
        </div>
      </footer>
      </div>
  );
}

export default Footer;*/


import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Onzbus</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Apps</h5>
            <ul>
              <li className="list-unstyled">
                <a href="https://apps.apple.com/ae/app/onzbus/id1481187516">Available in App Store</a>
              </li>
              <li className="list-unstyled">
                <a href="https://play.google.com/store/apps/details?id=com.qdc.onzbus">Available in Play Store</a>
              </li>
             
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.qdcmedia.com"> qdcmedia.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;