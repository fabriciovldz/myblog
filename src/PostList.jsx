import React from "react";
import Post from "./Post";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaFilm } from "react-icons/fa";

export default function PostList({ posts, db, setPosts }) {
	const timelineData = [
		{
			title: "Iron Man (2008)",
			text: "Asistente básico con memoria limitada.",
			image:
				"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/99C3214C11AD36F3862B94188496E40052E6AD133E0C5047F44ADF10F5A66837/scale?width=440&aspectRatio=1.78&format=webp",
		},
		{
			title: "Iron Man 2 (2010)",
			text: "Uso de sarcasmo e interpretación social.",
			image:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9HgP1LI8Nom33v81DYjscP-5IaC0it_i3PQ&s",
		},
		{
			title: "The Avengers (2012)",
			text: "Defensa autónoma de sistemas.",
			image:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAPzbue_f27_LOpZsbtDSOMV9cCF33NDO_A&s",
		},
		{
			title: "Iron Man 3 (2013)",
			text: "Predicción avanzada y toma de decisiones.",
			image:
				"https://preview.redd.it/c2p6dyq9mzs31.png?width=640&crop=smart&auto=webp&s=f551ad83298381169e7d765370dd02fb720ac7ac",
		},
		{
			title: "Age of Ultron (2015)",
			text: "Evolución en Vision.",
			image:
				"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/07D2EFEED91B57855290B61B5BF0231AEE47C5CCD8536D0A197976BBCBD7822F/scale?width=1200&aspectRatio=1.78&format=webp",
		},
	];

	return (
		<div className="body">
			{/* Post Destacado */}
			<div
				style={{
					background: "white",
					padding: "2rem",
					margin: "2rem",
					borderRadius: "10px",
				}}
				className="featured-post">
				<h2>✨ Destacado de la semana</h2>
				<h3>Iron Man (2008)</h3>
				<img
					src="https://www.ecartelera.com/carteles/fondos/1700/1773-n2.jpg"
					alt="Iron Man 2008"
					style={{
						width: "100%",
						maxHeight: "400px",
						objectFit: "cover",
						borderRadius: "10px",
						margin: "20px 0",
					}}
				/>
				<p>
					J.A.R.V.I.S. es más que un simple asistente virtual: es una IA
					avanzada con memoria limitada, capaz de aprender y optimizar su
					desempeño. Un claro ejemplo de esto ocurre cuando Tony prueba su
					armadura a gran altitud y J.A.R.V.I.S. predice la formación de hielo,
					evitando un posible fallo catastrófico.
					<br />
					Esta escena demuestra cómo J.A.R.V.I.S. piensa y actúa racionalmente,
					analizando datos en tiempo real para tomar decisiones lógicas. Aunque
					no tiene conciencia propia, su capacidad de anticipación y asistencia
					lo convierte en un sistema clave para el desarrollo tecnológico de
					Stark.
				</p>
				{/* Línea de Tiempo */}
				<h2>📅 Evolución de J.A.R.V.I.S.</h2>
				<VerticalTimeline lineColor="black">
					{timelineData.map((event, index) => (
						<VerticalTimelineElement
							key={event.title}
							className="vertical-timeline-element--work"
							contentStyle={{ background: "black", color: "white" }}
							contentArrowStyle={{
								borderRight: " 7px solid black",
								background: "black",
							}}
							iconStyle={{ background: "#facc15", color: "black" }}
							icon={<FaFilm />}>
							<h3 className="vertical-timeline-element-title">{event.title}</h3>
							<p>{event.text}</p>

							{/* Imagen de cada evento */}
							{event.image && (
								<img
									src={event.image}
									alt={event.title}
									style={{
										width: "100%",
										marginTop: "10px",
										borderRadius: "8px",
										objectFit: "cover",
										maxHeight: "250px",
									}}
								/>
							)}
						</VerticalTimelineElement>
					))}
				</VerticalTimeline>
			</div>

			{/* Lista de Posts */}
			<div className="container-title">
				<h2 style={{ color: "white" }}>📢 Publicaciones</h2>
			</div>
			<div className="post-list">
				{posts.map((post) => (
					<Post
						key={post.uid}
						post={post}
						db={db}
						setPosts={setPosts}
						posts={posts}
					/>
				))}
			</div>
		</div>
	);
}
