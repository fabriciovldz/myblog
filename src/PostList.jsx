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
		},
		{
			title: "Iron Man 2 (2010)",
			text: "Uso de sarcasmo e interpretación social.",
		},
		{ title: "The Avengers (2012)", text: "Defensa autónoma de sistemas." },
		{
			title: "Iron Man 3 (2013)",
			text: "Predicción avanzada y toma de decisiones.",
		},
		{ title: "Age of Ultron (2015)", text: "Evolución en Vision." },
	];

	return (
		<div>
			{/* Post Destacado */}
			<div className="featured-post">
				<h2>✨ Destacado de la semana</h2>
				<h3>Iron Man (2008)</h3>
				<p>
					J.A.R.V.I.S. es más que un simple asistente virtual: es una IA
					avanzada con memoria limitada, capaz de aprender y optimizar su
					desempeño. Un claro ejemplo de esto ocurre cuando Tony prueba su
					armadura a gran altitud y J.A.R.V.I.S. predice la formación de hielo,
					evitando un posible fallo catastrófico.
				</p>
				<p>
					Esta escena demuestra cómo J.A.R.V.I.S. piensa y actúa racionalmente,
					analizando datos en tiempo real para tomar decisiones lógicas. Aunque
					no tiene conciencia propia, su capacidad de anticipación y asistencia
					lo convierte en un sistema clave para el desarrollo tecnológico de
					Stark.
				</p>
			</div>

			{/* Línea de Tiempo */}
			<h2>📅 Evolución de J.A.R.V.I.S.</h2>
			<VerticalTimeline>
				{timelineData.map((event, index) => (
					<VerticalTimelineElement
						key={index}
						className="vertical-timeline-element--work"
						contentStyle={{ background: "#1e293b", color: "#fff" }}
						contentArrowStyle={{ borderRight: "7px solid  #1e293b" }}
						iconStyle={{ background: "#facc15", color: "#fff" }}
						icon={<FaFilm />}>
						<h3 className="vertical-timeline-element-title">{event.title}</h3>
						<p>{event.text}</p>
					</VerticalTimelineElement>
				))}
			</VerticalTimeline>

			{/* Lista de Posts */}
			<h2>📢 Publicaciones</h2>
			{posts.map((post) => (
				<Post
					key={post.id}
					post={post}
					db={db}
					setPosts={setPosts}
					posts={posts}
				/>
			))}
		</div>
	);
}
