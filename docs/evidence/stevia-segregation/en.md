### Sachet content: read weight and concentration together

A consistent fill weight does not by itself establish a consistent glycoside amount. Record three values for the same sachet: **net powder mass (g), the named glycoside concentration on an as-received basis (mg/g), and glycoside amount (mg/sachet)**.

**Glycoside amount (mg/sachet) = net powder mass (g) × concentration (mg/g).**

For a unit-conversion example—not a measured sample—a 2 g sachet at 1% w/w contains 20 mg of the named glycoside. Here, 1% w/w means 10 mg/g. In the CSV, enter `1` with `% w/w; as_received`, or `0.01` with `g/g; as_received`; these are two ways to record the same concentration. An assay already reported as mg for the whole sachet should not be multiplied by the sachet weight again. Convert a dry-basis result to the as-received basis before using this equation.

Read the three values together: changing weight with similar concentration points first to filling or weighing; similar weight with changing concentration calls for a closer look at sampling, analysis and the production stage. Neither pattern alone proves segregation.

#### Whole sachet or a portion?

Before filling, segregation in bulk powder could change the composition delivered to different sachets. After sealing, particle rearrangement alone cannot change the total glycoside amount in an intact sachet with no material loss or degradation. For whole-sachet use, measure whole-sachet recovery. For partial use, measure the portion actually removed and record its mass, position and removal method; do not extrapolate that portion to the whole sachet without evidence that it represents the entire contents.

A useful sampling map is **blender locations → discharge mass intervals → receiving hopper or bulk transfer → individual filled sachets**. Keep filling order and refill or restart events with each sample. For destructive transport comparisons, randomly allocate different sachets from the same production interval to transported and untransported groups; link them with a group ID rather than treating them as the same bag measured twice.

#### One sachet is not several independent samples

Use `sample_id` for the physical sample, `prep_id` for each separately prepared analytical portion and `injection_id` for each instrument injection. Several injections from one preparation are still measurements of one physical sample. Thermo's commercial-stevia application note, for example, reports two injections per sample—not two independently sampled sachets.[1]

Keep the sampling hierarchy when comparing net mass, concentration and mg/sachet. Agree sample numbers and decision rules with the laboratory before collection; repeat injections do not increase the number of independent bags.

Use the [blank sampling record](sampling-record.csv) and [material-characterization sheet](material-characterization.csv), with the [CSV filling guide](reader-en.md). The material sheet keeps Dv10/Dv50/Dv90, dispersion conditions and the three density measurements separate. HORIBA's commercial-sweetener study assessed dispersion pressure for each sample before reporting particle size, illustrating why measurement conditions belong beside the result.[2]

## Sources

[1] https://documents.thermofisher.com/TFS-Assets/CMD/Application-Notes/AN-1040-Analysis-Products-Containing-Stevia-AN70278.pdf — thermo original application note
[2] https://static.horiba.com/fileadmin/Horiba/Application/Food_and_Beverage/Food/AN213_Sugar_Substitutes.pdf — horiba original application note
