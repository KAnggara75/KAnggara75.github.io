import { FormEvent, useState } from "react";

export default function Contact() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const recipient = "kelvin.kanggara@gmail.com";
		const subject = encodeURIComponent(
			`Pesan dari Portofolio - ${name || "Pengunjung"}`
		);
		const body = encodeURIComponent(
			`Halo Kelvin,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${msg}\n`
		);
		window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
	};

	return (
		<section
			id="contact"
			className="bg-slate-100 py-24 dark:bg-dark"
		>
			<div className="container">
				<div className="w-full px-4">
					<div className="mx-auto mb-16 text-center">
						<h4 className="mb-2 text-lg font-semibold text-primary">Contact</h4>
						<h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl dark:text-slate-100">
							Hubungi Saya
						</h2>
						<p className="mx-auto max-w-xl text-base font-medium text-secondary md:text-lg dark:text-slate-300">
							Tertarik untuk berkolaborasi, berdiskusi seputar arsitektur sistem
							backend dan cloud-native, atau memiliki pertanyaan? Kirim pesan
							langsung melalui formulir di bawah ini.
						</p>
					</div>
				</div>

				<div className="w-full lg:mx-auto lg:w-2/3">
					<form onSubmit={handleSubmit}>
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
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Nama Anda"
								className="w-full rounded-xl bg-slate-200 p-3 text-dark focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
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
								type="email"
								name="email"
								id="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="email@domain.com"
								className="w-full rounded-xl bg-slate-200 p-3 text-dark focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
							/>
						</div>
						<div className="mb-8 w-full px-4">
							<label
								htmlFor="msg"
								className="text-base font-bold text-primary"
							>
								Pesan
							</label>
							<textarea
								name="msg"
								id="msg"
								rows={5}
								required
								value={msg}
								onChange={(e) => setMsg(e.target.value)}
								placeholder="Tuliskan pesan Anda..."
								className="w-full rounded-xl bg-slate-200 p-3 text-dark focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
							></textarea>
						</div>
						<div className="w-full px-4">
							<button
								type="submit"
								className="w-full rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition duration-500 hover:opacity-80 hover:shadow-lg"
							>
								Kirim Pesan
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
