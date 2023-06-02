import "./ErrorPage.css";

const ErrorPage = () => {
    return (
        <>
            <section className="error-page">
                <div className="content-container">Error page - 404</div>
                <a href="/" className="error-link">
                    Click here to return to startpage
                </a>
            </section>
        </>
    );
};

export default ErrorPage;
