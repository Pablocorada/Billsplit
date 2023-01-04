import React from 'react'

export const Footer = () => {

    return (
        <footer className="footer text-center text-lg-start bg-success w-100 mt-5">
            <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom px-5 mx-5">
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                <div>
                <a href="" className="me-4 text-reset">
                    <i className="bi bi-facebook" role="img"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="bi bi-twitter" role="img"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="bi bi-google" role="img"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="bi bi-instagram" role="img"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="bi bi-linkedin" role="img"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="bi bi-github" role="img"></i>
                </a>
                </div>
            </section>
            <div className="text-center p-3">
                © 2021 Copyright:
                <a className="text-reset fw-bold" href="">Pablo Corada</a>
            </div>
        </footer>
    );
    
}