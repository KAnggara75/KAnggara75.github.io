export default function Contact() {
	return (
		<section
			id="contact"
			className="py-24 dark:bg-slate-800"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto mb-16 text-center">
						<h4 className="mb-2 text-lg font-semibold text-primary">Contact</h4>
						<h2 className="mb-4 text-3xl font-bold text-dark dark:text-slate-100 sm:text-4xl lg:text-5xl">
							Hubungi Saya
						</h2>
						<p className="text-md font-medium text-secondary md:text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Provident, consequatur. Non, harum autem.
						</p>
					</div>
				</div>

				<div className="w-full lg:mx-auto lg:w-2/3">
					<form action="">
						<div className="mb-8 w-full px-4">
							<label
								htmlFor="name"
								className="text-base font-bold text-primary"
							>
								Nama
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="w-full rounded-xl bg-slate-200 p-3 text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							/>
						</div>
						<div className="mb-8 w-full px-4">
							<label
								htmlFor="email"
								className="text-base font-bold text-primary"
							>
								E-Mail
							</label>
							<input
								type="text"
								name="email"
								id="email"
								className="w-full rounded-xl bg-slate-200 p-3 text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							/>
						</div>
						<div className="mb-8 w-full px-4">
							<label
								htmlFor="msg"
								className="text-base font-bold text-primary"
							>
								Nama
							</label>
							<textarea
								name="msg"
								id="msg"
								className="h-30 w-full rounded-xl bg-slate-200 p-3 text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							></textarea>
						</div>
						<div className="w-full px-4">
							<button className="w-full rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition duration-500 hover:opacity-80 hover:shadow-lg">
								Kirim
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
