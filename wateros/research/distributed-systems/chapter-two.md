# Chapter 2: Hydraulics of Pressurized Flow

Pressurized flow refers to water flowing completely filled inside a closed conduit (pipe) under pressure, as opposed to open-channel flow where the water has a free surface. In a pressurized water distribution system (like water mains and pumping networks), flow is driven by pressure differences, and the pipes are usually flowing full. 

Understanding the hydraulics of pressurized flow involves learning the fundamental properties of water, how energy is expressed in flowing water (and concepts like the energy grade line and hydraulic grade line), and how energy is dissipated through friction losses and minor (form) losses. This chapter will build these concepts from first principles, including relevant equations and derivations, to provide a solid foundation for analyzing water distribution systems.

## Properties of Water

Water's physical properties play a crucial role in pressurized flow hydraulics. The key properties include density (and weight), viscosity, and compressibility (or lack thereof):

### Density (ρ)

Water has a density of about **1000 kg/m³** at typical temperatures (approximately 998 kg/m³ at 20°C). Density is mass per unit volume and, under gravity, relates to weight. The specific weight γ is the weight per unit volume (γ = ρ·g) and for water is about **9.81 kN/m³** at 4°C.

Density being essentially constant (for a given temperature) means a given vertical column of water produces a proportional pressure at the bottom (e.g. 1 m of water exerts about 9.81 kPa). This relationship is why we often measure pressure in terms of **head (height) of water**.

### Viscosity (μ)

Viscosity measures the fluid's internal friction or resistance to deformation. Physically, viscosity arises from molecular interactions, causing energy dissipation when layers of fluid slide past one another.

- **Dynamic viscosity** of water at 20°C is about **1.0×10⁻³ Pa·s**
- **Kinematic viscosity** ν = μ/ρ, which for water is around **1.0×10⁻⁶ m²/s** at 20°C
- Viscosity **decreases with higher temperature** (water becomes "thinner" when warm)

Viscosity is crucial in determining how easily water flows: it influences the flow regime (laminar vs turbulent) and the friction losses in pipes. Lower viscosity (e.g. warmer water) generally means lower resistance to flow, whereas higher viscosity (colder or more viscous fluids) increases resistance.

### Compressibility

In practical terms, **water is nearly incompressible**. Its bulk modulus is on the order of 2×10⁹ Pa, meaning enormous pressure is required to significantly compress its volume.

For example, a 1 atm (≈0.1013 MPa) increase in pressure yields only about a **0.048% decrease** in water's volume. Such a small volumetric change for large pressure increases validates treating water as incompressible in most engineering applications.

This assumption simplifies analysis:
- We consider density constant throughout the flow
- We neglect elastic energy storage in the fluid (except in water hammer/transient analyses)
- Incompressibility underpins the use of the continuity equation and the Bernoulli equation

## Energy and Hydraulic Grade Line

In pressurized flow, we account for the energy of water per unit weight, often expressed in terms of **head (length units)**. The Bernoulli equation formalizes energy conservation for an incompressible, inviscid flow and provides the basis for defining the energy grade line and hydraulic grade line.

### Bernoulli's Equation

In its simplest form (steady, frictionless flow along a streamline), Bernoulli's equation states that the total energy is constant:

```
p + ½ρv² + γz = constant along a streamline
```

Where:
- p is pressure
- v is velocity  
- z is elevation
- ρ is density
- γ = ρg is specific weight

Each term has units of pressure (force per area). We can divide through by γ to express energy per unit weight (head):

```
p/γ + v²/2g + z = H = constant (for ideal flow)
```

Where each term now has units of length (meters or feet). This form defines the **total head H**. The three components are commonly called:
- **Pressure head** (p/γ)
- **Velocity head** (v²/2g) 
- **Elevation head** (z)

### Energy Grade Line (EGL) and Hydraulic Grade Line (HGL)

In real water distribution systems, energy is lost due to friction and minor disturbances, so the total head drops in the direction of flow. We visualize energy distribution using two conceptual lines:

#### Energy Grade Line (EGL)
A line representing the total head H along the flow. By definition, EGL at any point is:

```
H = p/γ + v²/2g + z
```

- If there were no losses, the EGL would remain horizontal (constant H)
- In practice, the EGL slopes downward in the flow direction
- Each drop corresponds to energy (head) lost to friction or other dissipation
- Components like pumps add energy (raising the EGL), while turbines or significant friction drop the EGL

#### Hydraulic Grade Line (HGL)
A line representing the piezometric head, which is the sum of pressure head and elevation head:

```
HGL = p/γ + z
```

- The HGL essentially ignores the velocity head term
- It lies below the EGL by an amount equal to the velocity head (HGL = EGL – v²/2g)
- The HGL is the level to which water would rise in a small vertical tap (piezometer) on the pipe
- In a pipe of constant diameter (constant velocity), the difference between EGL and HGL remains constant

### Modified Bernoulli Equation with Losses

If we apply Bernoulli's equation between two points and include head losses:

```
z₁ + p₁/γ + v₁²/2g = z₂ + p₂/γ + v₂²/2g + hₗ
```

Where hₗ is the head loss between point 1 and 2. The head loss term encompasses both friction losses (major losses) and minor losses. Head loss is what causes the EGL to decline along the flow.

## Friction Loss Equations

As water flows through a pipe, viscosity causes a continuous conversion of mechanical energy into heat due to friction between the moving fluid and the pipe walls (and within fluid layers). These friction losses (also called **major losses**) manifest as a drop in pressure and available head along the flow.

### Darcy–Weisbach Equation

The Darcy–Weisbach equation is a **universal formula** for head loss due to pipe friction. It is based on fundamental principles and experimental data and applies to any fluid (not just water), in laminar or turbulent flow, as long as appropriate friction factor is used.

The Darcy–Weisbach equation for head loss hf (energy loss per unit weight of fluid) in a pipe of length L and diameter D is:

```
hf = f(L/D)(v²/2g)
```

Where:
- v is the mean flow velocity
- f is the Darcy friction factor (dimensionless)

This equation essentially states that head loss is proportional to:
- The dynamic pressure (expressed as v²/2g in head units)
- Times the ratio of L to D 
- Times the friction factor

#### Flow Rate Form
In many cases it's useful to relate head loss to flow rate Q rather than velocity. Since Q = Av = πD²v/4, we can substitute v = 4Q/(πD²):

```
hf = (8fL)/(π²gD⁵) × Q²
```

This shows the **quadratic relationship** (hf = KQ² for some constant K) which is useful in network analysis and pump head calculations.

#### Friction Factor f

A crucial part of using Darcy–Weisbach is finding the friction factor f:

**For laminar flow** (Re < 2300):
```
f = 64/Re
```

**For turbulent flow** (Re > 4000), f depends on both Re and the relative roughness of the pipe (ε/D). The classical way to determine f is by the **Colebrook-White equation**:

```
1/√f = -2.0 log₁₀(ε/D/3.7 + 2.51/(Re√f))
```

This must be solved iteratively. The Colebrook equation is plotted in the famous **Moody diagram**.

### Hazen–Williams Equation

The Hazen–Williams equation is an **empirical formula** developed specifically for water flow in pipes. It is popular in water distribution engineering because of its simplicity and avoids directly dealing with viscosity or Reynolds number.

**Important limitations:**
- Only valid for water (and water-like fluids) 
- Under ordinary temperature ranges (cold water around 5–25°C)

One form of the Hazen–Williams formula (in SI units) for head loss is:

```
hf = (10.67 L Q^1.852)/(C^1.852 D^4.8704)
```

Where:
- hf is the frictional head loss (in meters of water) over length L (m)
- Q is flow rate in m³/s
- D is pipe diameter in m  
- C is the Hazen–Williams roughness coefficient

#### Hazen–Williams C Values
The Hazen–Williams C is a dimensionless coefficient where **higher values denote smoother pipes**:

- **140–150**: New smooth pipes (plastic or cement-lined)
- **~130**: New cast iron
- **100 or below**: Older rough pipes

### Manning's Equation

The Manning equation originated in open channel flow studies, but can also be applied to full pipe flow. It's **empirical** and was traditionally used for gravity-driven flows (e.g. sewers, drainage).

Manning's equation for velocity:

```
V = (1/n) R^(2/3) S^(1/2)
```

Where:
- R is the hydraulic radius (for full circular pipe, R = D/4)
- S is the slope of the energy grade line (hf/L)
- n is Manning's roughness coefficient

#### Manning's n Values
Manning's n values are empirically determined roughness coefficients:
- **~0.009**: Very smooth pipe (new PVC)
- **0.012–0.015**: Concrete or old cast iron pipes

**Smaller n denotes smoother pipe** (allowing higher velocity for a given slope).

## Form (Minor) Losses

In addition to major losses from pipe friction, **minor losses** (also called form losses or local losses) occur at fittings, valves, bends, expansions, contractions, and other disturbances in flow path.

These losses are called "minor" not because they are always small, but because they are associated with **localized components** as opposed to continuous friction along the pipe. In some systems with many fittings or valves, minor losses can accumulate to be a significant portion of total head loss.

### Loss Coefficient Method

Minor losses are quantified using a dimensionless **loss coefficient K**:

```
hL,minor = K(v²/2g)
```

Each fitting or component has its own K value, usually determined experimentally:

#### Typical K Values
- **Standard 90° elbow**: K ≈ 0.2–0.3 (long-radius, smooth)
- **Sharp 90° elbow**: K ≈ 1.5 or higher  
- **Fully open gate valve**: K ≈ 0.15
- **Fully open globe valve**: K ≈ 10
- **Half-closed gate valve**: K ≈ 2
- **2/3 closed ball valve**: K ≈ 200 (extremely restrictive)

### Multiple Fittings
If multiple fittings exist in series, their K values simply add:

```
Ktotal = ΣKi
hL,total minor = Ktotal × v²/(2g)
```

### Equivalent Length Method
Sometimes K is converted into an **equivalent length** of pipe for use with Darcy–Weisbach:

```
Le = KD/f
```

This method is approximate because f can change with flow, but it's convenient for including minor losses by adding extra length to the pipe in calculations.

## Summary: Total Head Loss

In a pressurized flow system, the **total head loss** between two points is the sum of:

1. **Major losses** (pipe friction, calculated by Darcy–Weisbach or alternatives)
2. **Minor losses** (from fittings, etc.)

The energy equation with losses becomes:

```
z₁ + p₁/γ + v₁²/2g = z₂ + p₂/γ + v₂²/2g + hf + Σ hL,minor
```

Understanding how to compute each term allows engineers to:
- Design pipe systems
- Size pumps (to overcome losses and deliver required pressure)  
- Analyze network behavior

With these fundamentals, we can diagnose and model pressurized flow systems from first principles, setting the foundation for analyzing Non-Revenue Water and optimizing water distribution systems in the chapters ahead.