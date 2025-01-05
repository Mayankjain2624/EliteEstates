import React from "react";

function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
          About <span className="text-blue-600">Mayank Estate</span>
        </h1>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6">
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/600x400"
              alt="About Us"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to <span className="font-semibold">Mayank Estate</span>, 
              your one-stop platform for discovering and exploring exceptional real estate opportunities. 
              Whether you're searching for your dream home, a lucrative investment, or just looking to browse, 
              we provide a seamless and reliable experience tailored to your needs.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                🏡
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Wide Variety of Listings
                </h3>
                <p className="text-gray-600">
                  From luxurious homes to budget-friendly apartments, we have it all.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                🔍
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Easy Search & Filter
                </h3>
                <p className="text-gray-600">
                  Our advanced search tools make finding your perfect property effortless.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                🌍
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Global Reach
                </h3>
                <p className="text-gray-600">
                  Explore properties from across the globe at your fingertips.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                📞
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Our team is always here to assist you at every step.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                💼
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Trusted Professionals
                </h3>
                <p className="text-gray-600">
                  Work with experienced agents and real estate experts.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                🌟
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Customer Satisfaction
                </h3>
                <p className="text-gray-600">
                  We prioritize your satisfaction above everything else.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At <span className="font-semibold">Mayank Estate</span>, we aim to bridge the gap between you 
            and your perfect property. Our vision is to revolutionize the real estate industry with 
            transparency, reliability, and innovation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
