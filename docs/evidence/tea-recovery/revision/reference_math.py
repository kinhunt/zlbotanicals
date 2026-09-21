"""Reference arithmetic for synthetic verification ONLY, not a CSV calculator.
Callers must establish reporting basis, comparability and boundary completeness.
No automatic laboratory extraction-recovery correction or density assumption.
"""
import math


def amount(quantity, content, route, *, D=1, corrected=True,
           dry_fraction=None, extract_L=None, portion_kg=None):
    for value in (quantity, content, D):
        if not math.isfinite(value) or value < 0:
            raise ValueError('finite nonnegative inputs required')
    if D < 1:
        raise ValueError('conventional dilution D must be >=1')
    if dry_fraction is not None and (not math.isfinite(dry_fraction) or not 0 <= dry_fraction <= 1):
        raise ValueError('dry fraction must be in [0,1]')
    c = content if corrected else content * D
    if route == 'volume':
        if dry_fraction is not None:
            raise ValueError('volume route has no dry fraction')
        return quantity * c
    if route == 'extract':
        if any(v is None or not math.isfinite(v) or v <= 0 for v in (extract_L, portion_kg)):
            raise ValueError('positive extraction volume and portion mass required')
        c = c * extract_L / portion_kg
    elif route != 'mass':
        raise ValueError('unknown route; no implicit density conversion')
    return quantity * c * (1 if dry_fraction is None else dry_fraction)


def metrics(available, products, outputs, closing):
    """Synthetic point-metric reference. None=unknown; caller enumerates all streams.
    available includes opening inventory; outputs already includes products.
    Empty inventories must be represented by an evidenced zero, not omission.
    Returns recovery %, closure %, difference mg; no clipping above 100%.
    """
    groups = (available, products, outputs, closing)
    for group in groups:
        for value in group:
            if value is not None and (not math.isfinite(value) or value < 0):
                raise ValueError('nonnegative finite amounts required')
    totals = [sum(g) if g and all(v is not None for v in g) else None for g in groups]
    denominator, product, out, inventory = totals
    if denominator is None or denominator == 0:
        return None, None, None
    recovery = None if product is None else 100 * product / denominator
    if out is None or inventory is None:
        return recovery, None, None
    return recovery, 100 * (out + inventory) / denominator, denominator - out - inventory
