import cadquery as cq

# Parameters
outer_diameter = 120  # mm
inner_diameter = 116  # mm
height = 250  # mm
lid_height = 20  # mm
wall_thickness = 2  # mm

# Motor parameters
motor_width = 20  # mm
motor_height = 40  # mm
motor_depth = 10  # mm

# Component parameters
pi_zero_width = 65  # mm
pi_zero_height = 30  # mm
pcb_width = 80  # mm
pcb_height = 50  # mm
sensor_width = 20  # mm
sensor_height = 10  # mm
battery_width = 50  # mm
battery_height = 20  # mm
lidar_width = 30  # mm
lidar_height = 20  # mm

# Create the outer shell
outer_shell = cq.Workplane("XY").circle(outer_diameter / 2).extrude(height)

# Hollow out the cylinder
inner_shell = (
    cq.Workplane("XY")
    .circle(inner_diameter / 2)
    .extrude(height)
)

cansat_shell = outer_shell.cut(inner_shell)

# Engrave text
text_obj = (
    cq.Workplane("XY")
    .workplane(offset=height / 2)
    .text("Vila2Sat", 20, 2, cut=True)
)

cansat_with_text = cansat_shell.cut(text_obj)

# Motor holes
for angle in [0, 90, 180, 270]:
    cansat_with_text = (
        cansat_with_text
        .workplane(offset=50)
        .transformed(rotate=(0, 0, angle))
        .rect(motor_width, motor_depth)
        .cutThruAll()
    )

# Internal mounts
internal_mounts = (
    cq.Workplane("XY")
    .workplane(offset=100)
    .rect(pi_zero_width, motor_depth)
    .extrude(pi_zero_height)
    .workplane(offset=50)
    .rect(pcb_width, motor_depth)
    .extrude(pcb_height)
    .workplane(offset=50)
    .rect(sensor_width, motor_depth)
    .extrude(sensor_height)
    .workplane(offset=50)
    .rect(lidar_width, motor_depth)
    .extrude(lidar_height)
)

# Battery compartment
battery_compartment = (
    cq.Workplane("XY")
    .workplane(offset=0)
    .rect(battery_width, motor_depth)
    .extrude(battery_height)
)

# Create the lid
lid = (
    cq.Workplane("XY")
    .circle(outer_diameter / 2)
    .extrude(lid_height)
    .cut(
        cq.Workplane("XY")
        .circle(inner_diameter / 2)
        .extrude(lid_height)
    )
)

# Position the lid on top of the CanSat
lid = lid.translate((0, 0, height - lid_height))

# Combine all parts
final_cansat = (
    cansat_with_text
    .union(internal_mounts)
    .union(battery_compartment)
    .union(lid)
)

# Export to STL
cq.exporters.export(final_cansat, 'cansat_full.stl')
