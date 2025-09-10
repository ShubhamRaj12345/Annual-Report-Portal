import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Research.css";

const Research = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI for Healthcare",
      lead: "Dr. Neha Sharma",
      year: 2023,
      logo: "/logo.jpg" // public folder me rakha logo
    },
    {
      id: 2,
      title: "Renewable Energy Storage",
      lead: "Prof. Arjun Yadav",
      year: 2024,
      logo: "/logo.jpg" // same logo example
    },
  ]);

  const [adding, setAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    lead: "",
    year: new Date().getFullYear(),
    logo: "/logo.jpg", // default logo path
  });

  // Dynamic publications data based on projects
  const data = useMemo(() => {
    const years = {};
    projects.forEach((p) => {
      years[p.year] = (years[p.year] || 0) + 1; // each project = 1 publication
    });
    const sortedYears = Object.keys(years).sort();
    return sortedYears.map((year) => ({ year, publications: years[year] }));
  }, [projects]);

  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Publications", value: projects.length }, // dynamic
    { label: "Patents", value: 8 },
    { label: "Funding (Cr)", value: 15 },
  ];

  const handleAddClick = () => setAdding(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjects([
      ...projects,
      { ...newProject, id: Date.now(), year: Number(newProject.year) },
    ]);
    setNewProject({ title: "", lead: "", year: new Date().getFullYear(), logo: "/logo.jpg" });
    setAdding(false);
  };

  const handleCancel = () => {
    setNewProject({ title: "", lead: "", year: new Date().getFullYear(), logo: "/logo.jpg" });
    setAdding(false);
  };

  return (
    <div className="research-container">
      <div className="hero">
        <img src="/logo.jpg" alt="Logo" className="hero-logo" />
  <div className="hero-text"></div>
        <h1>Research & Innovation</h1>
        <p>Empowering the future with impactful discoveries</p>
      </div>

      {!adding ? (
        <div className="content">
          {/* Stats Cards */}
          <div className="stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="card">
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Dynamic Publication Growth Chart */}
          <div className="card chart-card">
            <h2>Publication Growth</h2>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="year" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip />
                  <Bar dataKey="publications" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Projects Table */}
          <div className="card">
            <div className="table-header">
              <h2>Research Projects</h2>
              <button className="add-btn" onClick={handleAddClick}>+ Add Project</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Logo</th>
                    <th>Title</th>
                    <th>Lead Researcher</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={project.id}>
                      <td>{index + 1}</td> {/* Correct serial number */}
                      <td>
                        {project.logo && (
                          <img
                            src={project.logo}
                            alt={project.title}
                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                          />
                        )}
                      </td>
                      <td>{project.title}</td>
                      <td>{project.lead}</td>
                      <td>{project.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Add Project Form */
        <div className="content">
          <div className="card form-card">
            <h2>Add New Research Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Lead Researcher</label>
                <input
                  type="text"
                  name="lead"
                  value={newProject.lead}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  value={newProject.year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Logo Path</label>
                <input
                  type="text"
                  name="logo"
                  value={newProject.logo}
                  onChange={handleChange}
                  placeholder="/logo.jpg"
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="add-btn">Add Project</button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  
  );
};

export default Research;
