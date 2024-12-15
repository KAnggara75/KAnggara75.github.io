export default function Contact() {
	return (
		<section
			id="contact"
			className="pt-36 pb-32"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto text-center mb-16">
						<h4 className="font-semibold text-lg text-primary mb-2">Contact</h4>
						<h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-5xl">
							Hubungi Saya
						</h2>
						<p className="font-medium text-md text-secondary md:text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Provident, consequatur. Non, harum autem.
						</p>
					</div>
				</div>

				<div className="w-full lg:w-2/3 lg:mx-auto">
					<form action="">
						<div className="w-full px-4 mb-8">
							<label
								htmlFor="name"
								className="text-base text-primary font-bold"
							>
								Nama
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="w-full bg-slate-200 text-dark p-3 rounded-xl focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
							/>
						</div>
						<div className="w-full px-4 mb-8">
							<label
								htmlFor="email"
								className="text-base text-primary font-bold"
							>
								E-Mail
							</label>
							<input
								type="text"
								name="email"
								id="email"
								className="w-full bg-slate-200 text-dark p-3 rounded-xl focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
							/>
						</div>
						<div className="w-full px-4 mb-8">
							<label
								htmlFor="msg"
								className="text-base text-primary font-bold"
							>
								Nama
							</label>
							<textarea
								name="msg"
								id="msg"
								className="w-full bg-slate-200 text-dark p-3 rounded-xl focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary h-30"
							></textarea>
						</div>
						<div className="w-full px-4">
							<button className="text-base font-semibold text-white py-3 px-8 bg-primary rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500">
								Kirim
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
