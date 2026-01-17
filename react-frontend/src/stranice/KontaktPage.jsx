const KontaktPage = () => {

    return(
        <div className="container">
            <header className="text-center mt-5">
                <h1 className="display-4">Kontaktirajte nas</h1>
                <p className="lead">Obratite nam se za sva pitanja ili pomoc</p>
            </header>

            <section className="my-5 text-left">
                <div className="row">
                    <div className="col-lg-4 offset-lg-1">
                        <h2 className="font-weight-bold">Nasa lokacija</h2>
                        <p>Posetite nas na:
                            <br />
                            Jove Ilica 154, Beograd 11000
                        </p>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Vase ime</label>
                                <input type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email adresa</label>
                                <input type="email" className="form-control" id="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Poruka</label>
                                <textarea className="form-control" id="message" rows="4"></textarea>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary">Pošalji</button>
                                </div>
                            </div>    
                        </form>
                    </div>

                    <div className="col-lg-5">
                        {/*googlemaps embed*/}
                        <iframe
                            title="Google Mapa" 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.3984453370535!2d20.47264837611213!3d44.77268167107106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70576248bf79%3A0xadaf5cff042d3bd0!2sFon!5e0!3m2!1ssr!2srs!4v1768693168837!5m2!1ssr!2srs"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>                    
                    </div>    
                </div>
            </section>
        </div>
    );
};
export default KontaktPage;