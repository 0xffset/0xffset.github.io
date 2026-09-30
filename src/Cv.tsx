// Contenido del CV (bilingüe: las clases .es/.en se muestran según el idioma activo)
export function CvTop() {
  return (
    <>
      <header>
        <div className="sub"><span className="es">Ingeniería de datos y de software</span><span className="en">Software &amp; Data Engineering</span></div>
        <h1>[0xffset]</h1>
      </header>

      <div className="ab">
        <h3><span className="es">Resumen</span><span className="en">Abstract</span></h3>
        <p className="es">Ingeniero de software y de datos con experiencia en análisis, pipelines ETL, aplicaciones orientadas a datos y machine learning. Trabajo con Python, SQL, Spark, Airflow y Kafka, sobre una base sólida de matemáticas, algoritmos y criptografía.</p>
        <p className="en">Software and data engineer with experience in analytics, ETL pipelines, data-driven applications and machine learning. I work with Python, SQL, Spark, Airflow and Kafka, on a solid foundation of mathematics, algorithms and cryptography.</p>
        <p className="kw"><i><span className="es">Palabras clave:</span><span className="en">Keywords:</span></i> ETL, <span className="es">criptografía, álgebra lineal, cálculo, sistemas distribuidos</span><span className="en">cryptography, linear algebra, calculus, distributed systems</span></p>
      </div>


    </>
  )
}

export function CvMid() {
  return (
    <>


      <div className="th">
        <p><b className="es">Teorema 1.</b><b className="en">Theorem 1.</b> <i className="es">Todo problema que vale la pena resolver tiene un modelo de datos.</i><i className="en">Every problem worth solving has a data model.</i></p>
        <p className="pf"><i className="es">Demostración.</i><i className="en">Proof.</i> <span className="es">Se deja como ejercicio al lector.</span><span className="en">Left as an exercise for the reader.</span> ∎</p>
      </div>

      <h2><span className="es">Experiencia</span><span className="en">Experience</span></h2>
      <div className="it"><div className="h"><span><b>Senior Data Analyst</b>, SISALRIL</span><span className="d">09/2024 – <span className="es">presente</span><span className="en">present</span></span></div>
        <p className="es">Pipelines distribuidos y ETL con Spark, PySpark y Airflow; integración con Kafka, Docker y Kubernetes; dashboards para decisiones operativas.</p><p className="en">Distributed pipelines and ETL with Spark, PySpark and Airflow; integration with Kafka, Docker and Kubernetes; dashboards for operational decisions.</p></div>
      <div className="it"><div className="h"><span><b>Data Analyst</b>, <span className="es">Ministerio de Medio Ambiente</span><span className="en">Ministry of Environment</span></span><span className="d">05/2024 – 09/2024</span></div>
        <p className="es">Reportes, ETL automatizados y visualizaciones para públicos técnicos y no técnicos.</p><p className="en">Reporting, automated ETL and visualizations for technical and non-technical audiences.</p></div>
      <div className="it"><div className="h"><span><b>Software Developer</b>, Equifax</span><span className="d">02/2024 – 05/2024</span></div>
        <p className="es">ETL en Python, migración masiva de datos con SQL Server y BCP, automatización con PowerShell.</p><p className="en">Python ETL, large-scale data migration with SQL Server and BCP, PowerShell automation.</p></div>
      <div className="it"><div className="h"><span><b>.NET Developer</b>, Mercury Soluciones</span><span className="d">11/2022 – 10/2023</span></div>
        <p className="es">Aplicaciones empresariales en C#, Razor Pages y MySQL para un cliente multinacional agrícola y logístico.</p><p className="en">Enterprise applications in C#, Razor Pages and MySQL for a multinational agriculture and logistics client.</p></div>
      <div className="it"><div className="h"><span><b>Flutter Developer</b>, Lorenzo AC</span><span className="d">08/2022 – 11/2022</span></div>
        <p className="es">Apps iOS con Flutter y Dart, APIs REST y pagos.</p><p className="en">iOS apps with Flutter and Dart, REST APIs and payments.</p></div>

      <h2><span className="es">Proyectos</span><span className="en">Projects</span></h2>
      <ol className="ref">
        <li><b>sokobo</b> (2026). <span className="es">Un sistema de álgebra computacional (CAS) ligero para la línea de comandos.</span><span className="en">A lightweight computer algebra system (CAS) for the command line.</span> <i>C++</i></li>
        <li><b>BlueBerryMath</b> (2020). <span className="es">Librería de cálculo, estadística y álgebra lineal.</span><span className="en">Calculus, statistics and linear algebra library.</span> <i>Python, Java, TypeScript</i></li>
        <li><b>Life-Maze</b> (2024). <span className="es">Simulador de autómatas celulares del juego de la vida de Conway (ver Figura 2).</span><span className="en">Cellular automata simulator for Conway's Game of Life (see Figure 2).</span> <i>React, TypeScript</i></li>
        <li><b>MinesReact</b> (2020). <span className="es">Buscaminas con lógica de juego e interfaz dinámica.</span><span className="en">Minesweeper with game logic and a dynamic UI.</span> <i>React</i></li>
        <li><b>FacturationSystem</b> (2020). <span className="es">Sistema de facturación configurable.</span><span className="en">Customizable invoicing system.</span> <i>C#, .NET</i></li>
        <li><b>eMarker Dashboard</b> (2020). <span className="es">Panel responsive de gestión de e-commerce.</span><span className="en">Responsive e-commerce management dashboard.</span> <i>JavaScript, CSS</i></li>
      </ol>


    </>
  )
}

export function CvEnd() {
  return (
    <>
      <h2><span className="es">Formación y logros</span><span className="en">Education &amp; Awards</span></h2>
      <ul className="pl">
        <li><b>ITLA</b>, <span className="es">Tecnólogo en Software</span><span className="en">Information Software Technologist</span> (2021–2023). GPA 3.9/4.0, <span className="es">beca de excelencia académica</span><span className="en">academic excellence scholarship</span>.</li>
        <li>Stanford, <i>Cryptography I</i> (2024). O'Reilly, <i>Quantum Computing Fundamentals</i> (2022). UC San Diego, <i>Bioinformatics</i> (2021).</li>
        <li>Databricks Fundamentals · Azure ML Pipelines · TryHackMe.</li>
        <li><span className="es">Olimpiadas Regionales de Matemáticas (2019–2020). Beca de ciberseguridad CNCS / Telefónica (2023).</span><span className="en">Regional Mathematics Olympiad (2019–2020). CNCS / Telefónica cybersecurity scholarship (2023).</span></li>
      </ul>

      <h2><span className="es">Herramientas</span><span className="en">Toolkit</span></h2>
      <table><tbody>
        <tr><td><span className="es">Lenguajes</span><span className="en">Languages</span></td><td>Python, Go, C++, C#, Java, JavaScript, Rust</td></tr>
        <tr><td><span className="es">Datos</span><span className="en">Data</span></td><td>Spark, PySpark, Databricks, Hadoop, Airflow, Kafka</td></tr>
        <tr><td><span className="es">Bases de datos</span><span className="en">Databases</span></td><td>SQL Server, PostgreSQL, MySQL, MongoDB, Redis, Cosmos DB, SQLite</td></tr>
        <tr><td>Web / App</td><td>.NET, Django, Flask, React, Flutter</td></tr>
        <tr><td>Cloud / DevOps</td><td>AWS, Azure DevOps, Docker, Kubernetes, Linux, Git, LaTeX</td></tr>
        <tr><td><span className="es">Idiomas</span><span className="en">Spoken</span></td><td><span className="es">Español (nativo), inglés (fluido), portugués (conversacional)</span><span className="en">Spanish (native), English (fluent), Portuguese (conversational)</span></td></tr>
      </tbody></table>

      <h2><span className="es">Contacto</span><span className="en">Contact</span></h2>
      <p className="es">¿Datos, matemáticas o software? Escríbeme a <a href="mailto:roggergarciadiaz@gmail.com">roggergarciadiaz@gmail.com</a> o mira mi código en <a href="https://github.com/0xffset" target="_blank" rel="noopener">GitHub</a>.</p>
      <p className="en">Data, math or software? Write to <a href="mailto:roggergarciadiaz@gmail.com">roggergarciadiaz@gmail.com</a> or see my code on <a href="https://github.com/0xffset" target="_blank" rel="noopener">GitHub</a>.</p>

    </>
  )
}

