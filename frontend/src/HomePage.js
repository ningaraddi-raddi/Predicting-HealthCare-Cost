// // src/HomePage.js
// import React from "react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   const styles = `
//     .hero-section {
//       background: linear-gradient(rgba(29, 53, 87, 0.7), rgba(29, 53, 87, 0.7)), 
//         url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop');
//       background-size: cover;
//       background-position: center;
//       height: 70vh;
//       min-height: 450px;
//     }

//     .hero-section h1 {
//       text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//     }

//     .features-section {
//       background-color: #f8f9fa;
//     }

//     .feature-icon {
//       width: 80px;
//       height: 80px;
//       border-radius: 50%;
//       display: inline-flex;
//       justify-content: center;
//       align-items: center;
//       box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//     }

//     .card {
//       transition: transform 0.3s ease, box-shadow 0.3s ease;
//     }

//     .card:hover {
//       transform: translateY(-10px);
//       box-shadow: 0 12px 24px rgba(0,0,0,0.15);
//     }
//   `;

//   return (
//     <div className="homepage">
//       <style>{styles}</style>

//       {/* Hero Section */}
//       <header className="hero-section text-white text-center d-flex flex-column justify-content-center align-items-center">
//         <div className="container">
//           <h1 className="display-4 fw-bold">Empower Your Health Journey with AI</h1>
//           <p className="lead my-3">
//             Our advanced model analyzes key health factors to provide an estimated annual healthcare expenditure.
//           </p>
//           <Link to="/predict" className="btn btn-primary btn-lg fw-bold px-4 py-2 mt-3">
//             Predict My Costs Now <i className="fas fa-arrow-right ms-2"></i>
//           </Link>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="features-section py-5">
//         <div className="container">
//           <div className="row text-center">

//             <div className="col-md-4 mb-4">
//               <div className="card h-100 shadow-sm border-0">
//                 <div className="card-body">
//                   <div className="feature-icon bg-primary text-white mb-3">
//                     <i className="fas fa-brain fa-2x"></i>
//                   </div>
//                   <h3 className="h5 card-title fw-bold">AI-Powered Predictions</h3>
//                   <p className="card-text text-muted">
//                     A sophisticated ML model trained on real healthcare data.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mb-4">
//               <div className="card h-100 shadow-sm border-0">
//                 <div className="card-body">
//                   <div className="feature-icon bg-success text-white mb-3">
//                     <i className="fas fa-shield-alt fa-2x"></i>
//                   </div>
//                   <h3 className="h5 card-title fw-bold">Secure & Private</h3>
//                   <p className="card-text text-muted">
//                     Your personal data is never stored or shared.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mb-4">
//               <div className="card h-100 shadow-sm border-0">
//                 <div className="card-body">
//                   <div className="feature-icon bg-info text-white mb-3">
//                     <i className="fas fa-tachometer-alt fa-2x"></i>
//                   </div>
//                   <h3 className="h5 card-title fw-bold">Instant Insights</h3>
//                   <p className="card-text text-muted">
//                     Get your healthcare cost prediction in seconds.
//                   </p>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;







// src/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // optional for small overrides (I will create this too)

const HomePage = () => {
  return (
    <div className="homepage">

      {/* Hero Section */}
      <header className="bg-dark text-white hero-section d-flex align-items-center">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Empower Your Health Journey with AI</h1>
          <p className="lead mt-3 mb-4">
            Our advanced ML model analyzes health factors to estimate your yearly healthcare cost.
          </p>

          <Link to="/predict" className="btn btn-primary btn-lg fw-semibold px-4 py-2">
            Predict My Costs Now <i className="fas fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose Our Predictor?</h2>

          <div className="row g-4">

            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100 text-center p-4">
                <div className="mb-3 feature-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                  <i className="fas fa-brain fa-2x"></i>
                </div>
                <h5 className="fw-bold">AI-Powered Predictions</h5>
                <p className="text-muted">
                  Powered by ML models trained on large health datasets for accurate cost forecasts.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100 text-center p-4">
                <div className="mb-3 feature-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center">
                  <i className="fas fa-shield-alt fa-2x"></i>
                </div>
                <h5 className="fw-bold">Secure & Private</h5>
                <p className="text-muted">
                  Your data stays safe — nothing is stored or shared outside your session.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100 text-center p-4">
                <div className="mb-3 feature-icon bg-info text-white rounded-circle d-flex align-items-center justify-content-center">
                  <i className="fas fa-tachometer-alt fa-2x"></i>
                </div>
                <h5 className="fw-bold">Instant Results</h5>
                <p className="text-muted">
                  Get your personalized healthcare cost predictions within seconds.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
