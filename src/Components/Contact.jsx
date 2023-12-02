
import React, { useRef } from "react";
import emailjs from '@emailjs/browser';

function ContactUs() {

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_emg3uqn', 'template_2v119ye', form.current, '5Qb0EL1hN5gdphPT1')
      .then((result) => {
        console.log(result.text);
        console.log("email sent");
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };

  return (
    <div className="h-screen w-full font-semibold ">
        <div className="h-screen w-1/2 absolute left-0 top-auto     bg-gradient-to-l from-gray-700 via-gray-900 to-black " >
          <form ref={form} onSubmit={sendEmail} className="bg-gradient-to-t from-red-700 via-slate-800 to-gray-900 rounded-3xl  w-1/2 mx-[9rem] my-[3rem] p-[3rem] ">  
            <div className="     ">
              <h1 className="text-2xl font-bold mb-2 text-red-600">Contact Us</h1>
            </div>
            <div className="input-group flex flex-col mb-4 pt-5 text-red-600 ">
              <label className="label mb-2" htmlFor="user_name">Name</label>
              <input
                required
                type="text"
                name="name"
                className="border p-2"
              />
            </div>
            <div className="input-group flex flex-col mb-4 text-red-600">
              <label htmlFor="user_email" className="label mb-2">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                className="border p-2"
              />
            </div>
            <div className="flex flex-col mb-4 text-red-600">
              <label htmlFor="user_phone" className="label mb-2">
                Phone
              </label>
              <input
                required
                type="number"
                name="phone"
                id="number"
                className="border p-2"
                style={{ MozAppearance: "textfield" }}
              />
            </div>
            <div className="flex flex-col mb-4 text-red-600">
              <label htmlFor="message" className="label mb-2">
                Describe Your issue
              </label>
              <textarea
                required
                style={{ resize: "none" }}
                name="message"
                id="complaint"
                className="textarea border p-2 w-full"
              />
            </div>
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
              send
            </button>
          </form>
        </div>
      <div className="items-center justify-center absolute right-0 top-auto h-screen  w-1/2 bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
      <section class=" mx-[3rem] my-[2.5rem]">
     <div class=" px-4 mx-auto max-w-screen-xl rounded-xl sm:py-8 lg:px-6 bg-gradient-to-t from-red-700 via-slate-800 to-gray-900">
      <h2 class="mb-4 text-2xl tracking-tight font-extrabold text-red-700 ">Frequently asked questions</h2>
      <div class="grid pt-4  text-left border-t border-red-600 md:gap-10 dark:border-gray-700 md:grid-cols-1">
          <div>
              <div class="mb-6">
                  <h3 class="flex items-center mb-2 text-lg font-medium text-red-600 ">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      What do you mean by "Figma assets"?
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.</p>
              </div>
              <div class="mb-6">                        
                  <h3 class="flex items-center mb-2 text-lg font-medium text-red-600 ">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      What does "lifetime access" exactly mean?
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">Once you have purchased either the design, code, or both packages, you will have access to all of the future updates based on the roadmap, free of charge.</p>
              </div>
              <div class="mb-6">
                  <h3 class="flex items-center mb-2 text-lg font-medium text-red-600 ">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      How does support work?
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">We're aware of the importance of well qualified support, that is why we decided that support will only be provided by the authors that actually worked on this project.</p>
                  <p class="text-gray-500 dark:text-gray-400">Feel free to <a href="#" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline" target="_blank" rel="noreferrer">contact us</a> and we'll help you out as soon as we can.</p>
              </div>
              <div class="mb-3">
                  <h3 class="flex items-center mb-2 text-lg font-medium text-red-600 \">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      I want to build more than one project. Is that allowed?
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">You can use Windster for an unlimited amount of projects, whether it's a personal website, a SaaS app, or a website for a client. As long as you don't build a product that will directly compete with Windster either as a UI kit, theme, or template, it's fine.</p>
              </div>
          </div>
         
      </div>
  </div>
</section>
      </div>
    </div>
    
  );
}

export default ContactUs;

